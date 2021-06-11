import React, { memo, useRef, useLayoutEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import routes from "./router";

import Xheader from "@/components/app-header";
import Xfooter from "@/components/app-footer";

export default memo(function App(props) {
  // console.log(process.env);
  const [mainH, setMainH] = useState(-1);

  const hRef = useRef();
  const fRef = useRef();

  useLayoutEffect(() => {
    computeH();
  });

  function computeH(name) {
    const offsetH = document.body.offsetHeight;
    const mainH = offsetH - hRef.current?.height - fRef.current?.height;
    setMainH(mainH);
  }

  return (
    <Router>
      <Xheader ref={hRef} />
      <div style={{ minHeight: `${mainH}px` }}>{renderRoutes(routes)}</div>
      <Xfooter ref={fRef} />
    </Router>
  );
});
