import { useMemo } from "react";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { FilteredKeys } from "~/utils/types";
import { isClient } from "~/utils/isClient";

import { currentUserReducer } from "./currentUser";
import { entitiesReducer } from "./entities";

const reducer = combineReducers({
  entities: entitiesReducer,
  currentUser: currentUserReducer,
});

const createStore = (preloadedState = {}) =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
  });

type Store = ReturnType<typeof createStore>;

let store: Store | undefined;

export const initializeStore = (preloadedState?: AppState): Store => {
  let _store = store ?? createStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = createStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (!isClient) return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export const useStore = (initialState: AppState): Store => {
  const _store = useMemo(() => initializeStore(initialState), [initialState]);

  return _store;
};

export type AppState = ReturnType<Store["getState"]>;
export type Dispatch = Store["dispatch"];

type E = ReturnType<typeof entitiesReducer>;
export type Keys = Exclude<FilteredKeys<E, undefined>, undefined>;
export type Entities = { [K in Keys]?: E[K] };

declare module "react-redux" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState extends AppState {}
}
