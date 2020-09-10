import { UserEntity } from "./model";
import { entityReducerFactory } from "~/utils/factories/entity";

const userSlice = entityReducerFactory<UserEntity>({
  name: "user",
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
