import { configureStore } from "@reduxjs/toolkit";
import homeReducer, { name as home } from "./containers/Home/redux";

// 需要导出成函数，导出成单例的话，作为SSR应用，会造成所有用户公用一个实例。这个是和CSR的区别
const getStore = (initState) =>
  configureStore({
    preloadedState: {
      ...initState,
    },
    reducer: {
      [home]: homeReducer,
    },
  });

export default getStore;
