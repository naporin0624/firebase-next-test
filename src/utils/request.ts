import axios from "axios";
import { isDev } from "./isDev";
import tough from "tough-cookie";
import axiosCookieJarSupport from "axios-cookiejar-support";

import type { AxiosInstance } from "axios";
import type { IncomingMessage } from "http";

export const clientRequest = (): AxiosInstance => {
  const cookieJar = new tough.CookieJar();

  const client = axios.create({
    jar: cookieJar,
    withCredentials: true,
  });

  return axiosCookieJarSupport(client);
};

export const serverSideRequest = (input: IncomingMessage): AxiosInstance => {
  const baseURL = `${isDev ? "http" : "https"}://${input?.headers?.host}`;
  return axios.create({
    baseURL,
    headers: { Cookie: input?.headers?.cookie ?? "" },
  });
};
