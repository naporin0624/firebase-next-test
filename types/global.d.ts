import admin from "firebase-admin";

declare module "next" {
  interface NextApiRequest {
    auth: admin.auth.DecodedIdToken;
  }
}
