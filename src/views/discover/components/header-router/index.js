import React, { memo } from "react";
import { NavLink } from "react-router-dom";

import { WrapStyle } from "./style";

export default memo(function Hrouter(props) {
  const routes = [
    {
      name: "推荐",
      to: "/discover/recommend",
    },
    {
      name: "排行榜",
      to: "/discover/toplist",
    },
    {
      name: "歌单",
      to: "/discover/playlist",
    },
    {
      name: "主播电台",
      to: "/discover/djradio",
    },
    {
      name: "歌手",
      to: "/discover/artist",
    },
    {
      name: "新碟上架",
      to: "/discover/album",
    },
  ];

  return (
    <WrapStyle>
      <div className="wrap-v2">
        {routes.map((v, i) => {
          return (
            <NavLink className="d-link" exact to={v.to} key={i}>
              {v.name}
            </NavLink>
          );
        })}
      </div>
    </WrapStyle>
  );
});
