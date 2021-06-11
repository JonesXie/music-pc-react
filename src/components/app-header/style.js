import styled from "styled-components";

import theme from "@/common/theme.js";

export const HeaderStyle = styled.div`
  background-color: ${theme.bgColor};
  min-height: 70px;
  width: 100%;
  .wrap-v1 {
    display: flex;
    flex-direction: row;
  }
  .h-after {
    width: 100%;
    height: 5px;
    background-color: ${theme.color};
  }
`;
export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  a {
    display: flex;
    height: 100%;
    color: #ccc;
    padding: 0 19px;
    position: relative;
    justify-content: center;
    align-items: center;
    &.active {
      color: #fff;
    }
    &.active::after {
      content: "";
      /* width: 12px;
      height: 7px; */
      border-style: solid;
      border-width: 0 6px 7px 6px;
      border-color: transparent transparent ${theme.color} transparent;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .discover-logo {
    display: inline-block;
    width: 38px;
    height: 38px;
    text-indent: -99999px;
  }
`;
export const HeaderRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.bgColor};
  height: 70px;
  width: 100%;
  .x-search {
    width: 158px;
    height: 32px;
    border-radius: 32px;
    overflow: hidden;
    font-size: 12px;
  }
  .ant-input {
    font-size: 12px;
  }
`;
