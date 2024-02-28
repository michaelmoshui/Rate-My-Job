import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/reducers";

export const store = configureStore({
  reducer: userReducer,
});
