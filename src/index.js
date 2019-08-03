import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { addStickyHoverFix } from "./utils/stickyHover";

// On mobiles/touch enabled devices `:hover` is not removed on touch release.
// So we handle it using below function.
addStickyHoverFix();

ReactDOM.render(<App />, document.getElementById("root"));
