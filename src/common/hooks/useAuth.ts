import { useState, useCallback } from "react";
import { auth } from "~/utils/firebase";

import type { User } from "firebase";

type ErrorState = { code: number; message: string };
type RawResult = { type: "SUCCESS" } | { type: "FAILURE"; payload: string };
type Result = { type: "SUCCESS"; payload: User } | { type: "FAILURE"; payload: string } | null;

type RegisterProps = { email: string; password: string };

export const useRegister = (): { requesting: boolean; result: Result; register: (props: RegisterProps) => void } => {
  const [requesting, updateRequesting] = useState(false);
  const [result, updateResult] = useState<Result | null>(null);

  const register = useCallback((props: RegisterProps) => {
    updateRequesting(true);
    const { email, password } = props;
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => updateResult({ type: "SUCCESS", payload: user }))
      .catch((e: ErrorState) => updateResult({ type: "FAILURE", payload: e.message }))
      .finally(() => updateRequesting(false));
  }, []);

  return { requesting, result, register };
};

type SignInProps = { email: string; password: string };

export const useSignIn = (): { signIn: (props: SignInProps) => void; requesting: boolean; result: Result } => {
  const [requesting, updateRequesting] = useState(false);
  const [result, updateResult] = useState<Result | null>(null);

  const signIn = useCallback((props: SignInProps) => {
    updateRequesting(true);
    const { email, password } = props;
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => updateResult({ type: "SUCCESS", payload: user }))
      .catch((e: ErrorState) => updateResult({ type: "FAILURE", payload: e.message }))
      .finally(() => updateRequesting(false));
  }, []);

  return { requesting, result, signIn };
};

export const useSignOut = (): { requesting: boolean; result: RawResult; signOut } => {
  const [requesting, updateRequesting] = useState(false);
  const [result, updateResult] = useState<RawResult | null>(null);

  const signOut = useCallback(() => {
    updateRequesting(true);
    auth()
      .signOut()
      .then(() => updateResult({ type: "SUCCESS" }))
      .catch((e: ErrorState) => updateResult({ type: "FAILURE", payload: e.message }))
      .finally(() => updateRequesting(false));
  }, []);

  return { requesting, result, signOut };
};
