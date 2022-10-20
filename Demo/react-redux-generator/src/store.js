import { configureStore } from "@reduxjs/toolkit";
import homeReducer, { name as home } from "./containers/home/redux";
export const getStore = (initialState = {}) =>
  configureStore({
    preloadedState: {
      ...initialState,
    },
    reducer: {
      [home]: homeReducer,
    },
  });

export default getStore;
