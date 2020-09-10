import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Ref = string | null | undefined;

type Options = {
  page: string;
  name: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const singleReducerFactory = (options: Options) => {
  const { page, name } = options;

  return createSlice({
    name: `${page}/${name}`,
    initialState: null as Ref,
    reducers: {
      put: (_state, action: PayloadAction<Ref>) => action.payload,
    },
  });
};
