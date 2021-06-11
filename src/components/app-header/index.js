import React, { memo, forwardRef, useImperativeHandle, useRef, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "@/utils/methods.js";

import { HeaderStyle, HeaderLeft, HeaderRight } from "./style";

const Xheader = function (props, ref) {
  // const history = props.history;
  const [showBar, setShowBar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // console.log(location);
    if (location.pathname === "/") {
      setShowBar(false);
    } else {
      setShowBar(true);
    }
  }, [location]);

  const htmlH = useRef();
  useImperativeHandle(ref, () => ({
    height: htmlH.current.offsetHeight,
  }));

  const keyEnter = function (e) {
    if (e.keyCode === 13) {
      console.log("发送请求");
    }
  };

  return (
    <HeaderStyle ref={htmlH}>
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
          <a href="https://www.yuque.com/jonesxie/daydayup" rel="noreferrer" target="_blank">
            前端进阶
          </a>
          <a href="https://github.com/JonesXie" rel="noreferrer" target="_blank">
            GitHub
          </a>
        </HeaderLeft>
        <HeaderRight>
          <Input
            allowClear
            placeholder="音乐/视频/电台/用户"
            className="x-search"
            size="small"
            prefix={<SearchOutlined />}
            onKeyUp={debounce(keyEnter, 300)}
          />
        </HeaderRight>
      </div>
      {showBar && <div className="h-after"></div>}
    </HeaderStyle>
  );
};

export default memo(forwardRef(Xheader));
