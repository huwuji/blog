import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./containers/layout";
import Home from "./containers/home";
import Intro from "./containers/intro/index.js";
import NoPage from "./containers/404";
export default () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="intro" element={<Intro />} />
        <Route path="*" element={<NoPage />} />
      </Route>
      <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
);
