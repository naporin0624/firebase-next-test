// utility types
export type NestArray<T> = T | Array<NestArray<T>>;
export type FilteredKeys<T, U> = { [P in keyof T]: T[P] extends U ? never : P }[keyof T];
export type Flatten<T extends NestArray<unknown>> = T extends NestArray<infer I> ? I : never;
