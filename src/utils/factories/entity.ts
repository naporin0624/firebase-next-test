import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { merge } from "~/utils/merge";
import { BaseEntity } from "~/utils/normalizer";

type Dict<T = unknown> = {
  [key: string]: T;
};

type Options = {
  name: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const entityReducerFactory = <T extends BaseEntity>(options: Options) => {
  const { name } = options;

  const slice = createSlice({
    name: `entities/${name}`,
    initialState: {} as Dict<T>,
    reducers: {
      mergeNormalized: (state, action: PayloadAction<Dict<T> | undefined>) => merge(state as Dict<T>, action.payload),
      upsert: (state, action: PayloadAction<T>) =>
        merge(state as Dict<T>, {
          [action.payload.id]: action.payload,
        }),
      override: (state, action: PayloadAction<T>) => ({
        ...(state as Dict<T>),
        [action.payload.id]: action.payload,
      }),
      destroy: (state, action: PayloadAction<string>) => {
        const { [action.payload]: _, ...next } = state as Dict<T>;

        return next;
      },
    },
  });

  return slice;
};
