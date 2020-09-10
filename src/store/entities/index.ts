import { combineReducers } from "redux";
import { userReducer } from "./user";

export const entitiesReducer = combineReducers({ users: userReducer });
