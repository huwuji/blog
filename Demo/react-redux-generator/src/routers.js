import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./containers/layout";
import Home from "./containers/home";
// import Intro from "./containers/intro/index.js";
const IntroPage = lazy(() => import("./containers/intro/index"));
// import NoPage from "./containers/404";
const NoPage = lazy(() => import("./containers/404"));

export default () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="intro" element={<Intro />} /> */}
        <Route
          path="intro"
          element={
            <Suspense fallback="loading...">
              <IntroPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback="loading...">
              <NoPage />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
);
