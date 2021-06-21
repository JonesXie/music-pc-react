import React, { memo } from "react";

import { FooterStyle } from "./style";

export default memo(function Xfooter(props) {
  return (
    <FooterStyle className={props.className} href="https://github.com/jonesxie" rel="noreferrer" target="_blank">
      Power by Jonesxie
    </FooterStyle>
  );
});
