import { NextApiHandler } from "next";
import { auth } from "./firebase-admin";
import { parseCookie } from "~/utils/parseCookie";
import { Cookies } from "~/common/types/cookies";

export const verifyHandler: (handler: NextApiHandler) => NextApiHandler = (handler) => {
  return async (req, res) => {
    const { _SESSION } = parseCookie<Cookies>(req.headers.cookie ?? "");

    try {
      const decodedToken = await auth().verifyIdToken(_SESSION);
      req.auth = decodedToken;
      await handler(req, res);
    } catch (e) {
      res.statusCode = 403;
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify({ status: 403, message: e.message }));
    }
  };
};
