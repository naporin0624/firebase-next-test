import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Options = {
  page: string;
  name: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const objectReducerFactory = <S extends { [key: string]: unknown }>(options: Options) => {
  const { page, name } = options;

  return createSlice({
    name: `${page}/${name}`,
    initialState: {} as S,
    reducers: {
      put: (_state, action: PayloadAction<S>) => action.payload,
      clear: () => ({} as S),
    },
  });
};
