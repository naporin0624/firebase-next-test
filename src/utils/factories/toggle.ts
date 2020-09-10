import { createSlice } from "@reduxjs/toolkit";

type Options = {
  page: string;
  name: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toggleReducerFactory = (options: Options) => {
  const { page, name } = options;

  return createSlice({
    name: `${page}/${name}`,
    initialState: false as boolean,
    reducers: {
      toTrue: () => true,
      toFalse: () => false,
      toggle: (state) => !state,
    },
  });
};
