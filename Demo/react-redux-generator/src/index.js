import { createRoot } from "react-dom/client";
import React from "react";

import Home from "./containers/home";

const rooter = createRoot(document.getElementById("root"));
rooter.render(<Home />);
