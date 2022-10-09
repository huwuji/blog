import { createRoot } from "react-dom/client";
import React from "react";

import Routers from "./routers";

const rooter = createRoot(document.getElementById("root"));
rooter.render(<Routers />);
