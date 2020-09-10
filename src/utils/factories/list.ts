import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Options = {
  page: string;
  name: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const listReducerFactory = (options: Options) => {
  const { page, name } = options;

  return createSlice({
    name: `${page}/${name}`,
    initialState: [] as string[],
    reducers: {
      populate: (_state, action: PayloadAction<string[]>) => action.payload,
      unshift: (state, action: PayloadAction<string>) => [action.payload, ...state],
      push: (state, action: PayloadAction<string>) => [...state, action.payload],
      remove: (state, action: PayloadAction<string>) => state.filter((ref) => ref !== action.payload),
    },
  });
};
