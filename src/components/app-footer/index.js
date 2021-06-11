import React, { forwardRef, memo, useRef, useImperativeHandle } from "react";

import { FooterStyle } from "./style";

export default memo(
  forwardRef(function Xfooter(props, ref) {
    const htmlH = useRef();

    useImperativeHandle(ref, () => ({
      height: htmlH.current.offsetHeight,
    }));
    return (
      <FooterStyle ref={htmlH} href="https://github.com/jonesxie" rel="noreferrer" target="_blank">
        Power by Jonesxie
      </FooterStyle>
    );
  })
);
