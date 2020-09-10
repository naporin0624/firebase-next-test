import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type State<T, E> = {
  isRequesting: boolean;
  payload: T | null;
  error: E | null;
};

type Options = {
  page: string;
  name: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const requestReducerFactory = <P = never, E = AxiosError>(options: Options) => {
  const { page, name } = options;
  const initialState = {
    isRequesting: false,
    payload: null,
    error: null,
  } as State<P, E>;

  return createSlice({
    name: `${page}/${name}`,
    initialState,
    reducers: {
      start: (state) => ({
        ...(state as State<P, E>),
        isRequesting: true,
      }),
      succeed: (state, action?: PayloadAction<P>) => ({
        ...(state as State<P, E>),
        isRequesting: false,
        ...(action
          ? {
              payload: action.payload,
            }
          : {}),
      }),
      fail: (state, action: PayloadAction<E>) => ({
        ...(state as State<P, E>),
        error: action.payload,
      }),
    },
  });
};
