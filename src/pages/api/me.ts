import { NextApiHandler } from "next";
import { verifyHandler } from "~/utils/verifyHandler";
import { routeSwitcher } from "~/utils/routeSwitcher";
import { auth } from "~/utils/firebase-admin";

import type { User } from "~/store/entities/user/model";

const index: NextApiHandler = async (req, res) => {
  const { uid } = req.auth;
  const userRecord = await auth().getUser(uid);
  const me: User = {
    id: uid,
    name: userRecord.displayName ?? "",
    email: userRecord.email ?? "",
  };

  res.json({
    me,
  });
};

export default verifyHandler(
  routeSwitcher({
    get: index,
  })
);
