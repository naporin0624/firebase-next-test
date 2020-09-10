import { createEntity, NormalizedEntity } from "~/utils/normalizer";

export type User = {
  id: string;
  email: string;
  name: string;
};

export type UserEntity = NormalizedEntity<User>;
export const userEntity = createEntity<User>("users", {});
