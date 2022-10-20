import { createRoot } from "react-dom/client";
import React from "react";
import { Provider } from "react-redux";

import Routers from "./routers";
import getStore from "./store";

const rooter = createRoot(document.getElementById("root"));
rooter.render(
  <Provider store={getStore()}>
    <Routers />
  </Provider>
);
