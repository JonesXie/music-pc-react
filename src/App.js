import React, { memo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import routes from "./router";

import Xheader from "@/components/app-header";
import Xfooter from "@/components/app-footer";

export default memo(function App() {
  // console.log(process.env);
  return (
    <Router>
      <Xheader />
      {renderRoutes(routes)}
      <Xfooter />
    </Router>
  );
});
