import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useRegister } from "~/common/hooks/useAuth";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";

type Props = {
  cookie: string;
};

export const Register: React.FC<Props> = (props) => {
  const cookie = useCookie(props.cookie);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), []);
  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), []);
  const canSubmit = useMemo(() => email !== "" && password.length > 6, [email, password.length]);
  const { register, requesting, result } = useRegister();
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      register({ email, password });
    },
    [email, password, register]
  );

  const clear = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
  }, []);

  useEffect(() => {
    if (!result) return;

    if (result.type === "SUCCESS") {
      const user = result.payload;
      user.getIdToken().then((value) => {
        cookie.set("_SESSION", value);
      });
    }

    if (result.type === "FAILURE") {
      console.error(result.payload);
    }
  }, [cookie, result]);

  return (
    <form onSubmit={onSubmit}>
      <div className={"flex flex-col mb-4"}>
        <div className={"flex items-center mb-2"}>
          <label className={"w-32"}>メールアドレス</label>
          <input type="email" placeholder="email" onChange={onChangeEmail} value={email} />
        </div>

        <div className={"flex items-center mb-2"}>
          <label className={"w-32"}>パスワード</label>
          <input type="password" placeholder="password" onChange={onChangePassword} value={password} />
        </div>
      </div>

      <div>
        <button className={"bg-blue-500 text-white rounded px-6 py-1"} disabled={!canSubmit}>
          登録
        </button>
        <button className={"ml-3 border rounded px-6 py-1"} onClick={clear}>
          クリア
        </button>
      </div>
    </form>
  );
};
