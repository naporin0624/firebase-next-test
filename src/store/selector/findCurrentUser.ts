import { createSelector } from "@reduxjs/toolkit";

import type { AppState, Entities } from "~/store";
import type { User } from "~/store/entities/user/model";
import { denormalizer } from "~/utils/normalizer";
import { userEntity } from "~/store/entities/user/model";

export const findCurrentUser = createSelector<AppState, AppState["currentUser"], Entities, User | null | undefined>(
  (state) => state.currentUser,
  (state) => state.entities,
  (id, entities) => denormalizer(id, userEntity, entities)
);
