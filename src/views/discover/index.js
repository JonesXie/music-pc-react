import React, { memo } from "react";
import { renderRoutes } from "react-router-config";

import Hrouter from "./components/header-router";

export default memo(function Xdiscover(props) {
  const routes = props.route.routes;
  return (
    <div>
      <Hrouter />
      发现页
      {renderRoutes(routes)}
    </div>
  );
});
