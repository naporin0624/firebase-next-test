import admin from "firebase-admin";

if (admin.apps.length === 0) {
  const key = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");

  admin.initializeApp({
    credential: admin.credential.cert({
      ...key,
      private_key: key["private_key"].replace(/\\n/g, "\n"),
    } as admin.ServiceAccount),
  });
}

export const { auth, firestore } = admin;
