import React, { memo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import store from "./store";

import routes from "./router";

import Xheader from "@/components/app-header";
import Xfooter from "@/components/app-footer";

export default memo(function App(props) {
  // console.log(process.env);

  return (
    <Provider store={store}>
      <Router>
        <Xheader className="header" />
        <div className="content">{renderRoutes(routes)}</div>
        <Xfooter className="footer" />
      </Router>
    </Provider>
  );
});
