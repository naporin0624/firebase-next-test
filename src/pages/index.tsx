import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { findCurrentUser } from "~/store/selector/findCurrentUser";

import type { NextPage } from "next";

const Welcome: NextPage = () => {
  const user = useSelector(findCurrentUser);

  return (
    <>
      <p>{JSON.stringify(user, null, 2)}</p>
      <Link href="/signin" as="/signin">
        signin
      </Link>
      <Link href="/register" as="/register">
        register
      </Link>
    </>
  );
};

export default Welcome;
