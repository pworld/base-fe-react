// store.js

import { configureStore, Reducer, UnknownAction } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: {
    root: rootReducer as Reducer<unknown, UnknownAction, unknown>,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
