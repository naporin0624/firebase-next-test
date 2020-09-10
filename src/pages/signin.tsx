import React from "react";
import { NextPage, GetServerSideProps } from "next";
import { SignIn } from "~/common/components/SignIn";
import Link from "next/link";

type Props = {
  cookie: string;
};

const SigninPage: NextPage<Props> = ({ cookie }) => {
  return (
    <>
      <h1>sign in</h1>
      <SignIn cookie={cookie} />

      <Link href="/register" as="/register">
        register
      </Link>
      <Link href="/" as="/">
        home
      </Link>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  return {
    props: {
      cookie: req.headers.cookie ?? "",
    },
  };
};

export default SigninPage;
