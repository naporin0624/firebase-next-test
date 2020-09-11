import { NextApiHandler } from "next";
import { Cookie } from "next-cookie";
import { auth } from "./firebase-admin";

export const verifyHandler: (handler: NextApiHandler) => NextApiHandler = (handler) => {
  return async (req, res) => {
    const cookie = new Cookie(req.headers.cookie ?? "");
    const _SESSION = cookie.get<string>("_SESSION");

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
