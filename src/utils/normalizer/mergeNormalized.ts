import type { Entities, Keys } from "~/store";
import type { Dispatch } from "@reduxjs/toolkit";
import { userActions } from "~/store/entities/user";

// INJECT_ACTION_HYGEN

// eslint-disable-next-line no-void
const assert = <T>(value: T) => void value;

export const mergeNormalized = (entities: Entities) => {
  return (dispatch: Dispatch): void => {
    (Object.keys(entities) as Keys[]).forEach((key: Keys) => {
      switch (key) {
        // INJECT_MERGE_NORMALIZED_HYGEN
        case "users":
          dispatch(userActions.mergeNormalized(entities[key]));
          break;
        default: {
          assert<never>(key);
          break;
        }
      }
    });
  };
};
