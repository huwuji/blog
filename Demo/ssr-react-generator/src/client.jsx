/**
 * 客户端Spa入口
 */
import React from "react";
import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { Provider } from "react-redux";
import StyleContext from "isomorphic-style-loader/StyleContext";

// import Home from './containers/Home/index';
import routersConfig from "./routers";
import getStore from "./store";

const router = createBrowserRouter(routersConfig);

const insertCss = (...styles) => {
  const removeCss = styles.map((style) => style._insertCss());
  return () => removeCss.forEach((dispose) => dispose());
};

const App = () => {
  const defaultState = window.context ? window.context.state : {};
  console.log("clent==state--", defaultState);
  return (
    <Provider store={getStore(defaultState)}>
      <StyleContext.Provider value={{ insertCss }}>
        <RouterProvider router={router} />
      </StyleContext.Provider>
    </Provider>
  );
};
const container = document.getElementById("root");
hydrateRoot(container, <App />);
