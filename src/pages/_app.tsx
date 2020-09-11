import React from "react";
import { Provider } from "react-redux";
import App from "next/app";
import { serverSideRequest } from "~/utils/request";
import { useStore, initializeStore } from "~/store";
import { normalizer } from "~/utils/normalizer";
import { isClient } from "~/utils/isClient";
import { currentUserActions } from "~/store/currentUser";
import { userEntity } from "~/store/entities/user/model";

import type { AppContext, AppInitialProps, AppProps } from "next/app";
import type { NextComponentType } from "next";
import type { User } from "~/store/entities/user/model";

import "./styles.css";
import { mergeNormalized } from "~/utils/normalizer/mergeNormalized";

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({ pageProps, Component }) => {
  const store = useStore(pageProps.initialState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

MyApp.getInitialProps = async (appContext): Promise<AppInitialProps> => {
  const { req, res } = appContext.ctx;
  const appProps = await App.getInitialProps(appContext);
  if (isClient) return appProps;

  const store = initializeStore();
  try {
    const response = await serverSideRequest(req).get<{ me: User }>("/api/me");
    const { entities, result } = normalizer(response.data.me, userEntity);
    store.dispatch(mergeNormalized(entities));
    store.dispatch(currentUserActions.put(result));
  } catch (e) {
    if (req.url !== "/signin" && req.url !== "/register") {
      res.writeHead(302, { Location: "/signin" });
      res.end();
      return;
    }
  }

  return {
    pageProps: {
      initialState: store.getState(),
    },
  };
};

export default MyApp;
