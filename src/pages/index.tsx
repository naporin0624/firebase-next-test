import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clientRequest } from "~/utils/request";
import { findCurrentUser } from "~/store/selector/findCurrentUser";
import { normalizer } from "~/utils/normalizer";
import { userEntity } from "~/store/entities/user/model";

import type { NextPage } from "next";
import type { User } from "~/store/entities/user/model";
import { currentUserActions } from "~/store/currentUser";
import { mergeNormalized } from "~/utils/normalizer/mergeNormalized";

const Welcome: NextPage = () => {
  const user = useSelector(findCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) return;
    clientRequest()
      .get<{ me: User }>("/api/me")
      .then((res) => {
        const user = res.data.me;
        const { result, entities } = normalizer(user, userEntity);
        dispatch(mergeNormalized(entities));
        dispatch(currentUserActions.put(result));
      });
  }, [dispatch, user]);

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
