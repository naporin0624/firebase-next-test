import React from "react";
import { NextPage, GetServerSideProps } from "next";
import { Register } from "~/common/components/Register";
import Link from "next/link";

type Props = {
  cookie: string;
};

const Signin: NextPage<Props> = ({ cookie }) => {
  return (
    <>
      <h1>register</h1>
      <Register cookie={cookie} />
      <Link href="/signin" as="/signin">
        signin
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

export default Signin;
