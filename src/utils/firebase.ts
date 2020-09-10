import firebase from "firebase/app";
import "firebase/auth";

if (firebase.apps.length === 0) {
  firebase.initializeApp(JSON.parse(process.env.FIREBASE_CONFIG || "{}"));
}

export const { auth } = firebase;
