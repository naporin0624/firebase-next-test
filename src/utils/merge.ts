import deepmerge from "deepmerge";

export const merge = <T>(state: T, payload: T): T =>
  deepmerge<T>(state, payload, {
    arrayMerge: (_d, s) => s,
  });
