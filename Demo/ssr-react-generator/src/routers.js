import React from "react";
import Home from "./containers/Home/index";
import Desc from "./containers/Desc/index";

export default [
  {
    path: "/",
    element: <Home />,
    getInitialProps: Home.getInitialProps,
    // children: [
    //   {
    //     path: "/home",
    //     element: <Home />,
    //   },
    //   {
    //     path: "/desc",
    //     element: <Desc />,
    //   },
    // ],
  },
  {
    path: "/desc",
    element: <Desc />,
  },
];
