import { schema, denormalize, normalize, NormalizedSchema } from "normalizr";
import { NestArray, Flatten } from "~/utils/types";
import { Entities } from "~/store";

// entity types
export type BaseEntity = {
  id: string;
  _$entity?: unknown;
};
type FindKeys<T> = {
  [K in keyof T]: keyof BaseEntity extends keyof Exclude<Flatten<T[K]>, undefined | null> ? K : never;
}[keyof T];

export type Find<T> = {
  [K in FindKeys<T>]: T[K];
};
type ArrayToString<T> = T extends Array<infer U> ? Array<ArrayToString<U>> : string;
export type NormalizedEntity<T extends { [key: string]: unknown }> = {
  [K in keyof T]: K extends keyof Find<T> ? ArrayToString<T[K]> : T[K];
};
export type BaseSchema = { id: string } & { [key: string]: unknown };
export type Schema<T> = T extends Array<infer U> ? [Schema<U>] : schema.Entity<T>;

type DictSchema<T extends { [key: string]: unknown }> = {
  [K in keyof T]: Schema<Exclude<T[K], undefined | null>>;
};

type RelatedEntities<T extends { [key: string]: unknown }> = DictSchema<Find<T>>;
type Entity<D, T> = D extends Array<infer U> ? [Entity<U, T>] : schema.Entity<T>;
type Denormalized<D, S> = D extends Array<infer U> ? Array<Denormalized<U, S>> : S | undefined;
type Result<T> = T extends Array<infer U> ? Array<Result<U>> : string;

export const createEntity = <T extends BaseSchema>(
  entityName: string,
  relatedEntities: RelatedEntities<T>
): schema.Entity<T> => new schema.Entity<T>(entityName, relatedEntities);

export const denormalizer = <D extends NestArray<string>, S, T extends Entities>(
  data: D,
  schema1: Entity<D, S>,
  entities: T
): Denormalized<D, S> => denormalize(data, schema1, entities);

export const normalizer = <T>(data: T, schema2: Schema<T>): NormalizedSchema<Entities, Result<T>> =>
  normalize<T, Entities, Result<T>>(data, schema2);
