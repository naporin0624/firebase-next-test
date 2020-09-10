import { entityReducerFactory } from "~/utils/factories/entity";
import { singleReducerFactory } from "~/utils/factories/single";

const slice = singleReducerFactory({ page: "global", name: "currentUser" });

export const currentUserActions = slice.actions;
export const currentUserReducer = slice.reducer;
