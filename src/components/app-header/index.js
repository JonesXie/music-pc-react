import React, { memo } from "react";

import { NavLink } from "react-router-dom";

import { HeaderStyle, HeaderLeft, HeaderRight } from "./style";

export default memo(function Xheader() {
  return (
    <HeaderStyle>
      <div className="wrap-v1">
        <HeaderLeft>
          <a href="/" className="discover-logo">
            music
          </a>
          <NavLink exact to="/">
            发现音乐
          </NavLink>
          <NavLink to="/my">我的音乐</NavLink>
          <NavLink to="/friend">朋友</NavLink>
        </HeaderLeft>
        <HeaderRight>右侧</HeaderRight>
      </div>
    </HeaderStyle>
  );
});
