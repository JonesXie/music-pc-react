import styled from "styled-components";

import theme from "@/common/theme.js";

export const WrapStyle = styled.div`
  width: 100%;
  height: 34px;
  background-color: ${theme.color};
  .d-link {
    display: inline-block;
    height: 20px;
    padding: 0 13px;
    margin: 7px 17px 0;
    border-radius: 20px;
    line-height: 21px;
    color: #fff;
    font-size: 14px;
    &.active {
      background: #9b0909;
    }
  }
`;
