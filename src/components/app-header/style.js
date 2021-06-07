import styled from "styled-components";

export const HeaderStyle = styled.div`
  background-color: #242424;
  height: 70px;
  width: 100%;
  .wrap-v1 {
    display: flex;
    flex-direction: row;
  }
`;
export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  a {
    color: #ccc;
    padding: 0 19px;
    position: relative;
    &.active {
      color: #fff;
    }
  }
`;
export const HeaderRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  background-color: #242424;
  height: 70px;
  width: 100%;
`;
