import { Link } from "react-router-dom";
import styled from "styled-components";
import Palette from "../../utils/Palette";

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  border-bottom: 1px ${Palette.BACKGROUND_GERY} solid;
  position: sticky;
  top: 0;
  background-color: white;
`;
export const Logo = styled(Link)`
  color: ${Palette.PRIMARY_GERY};
  font-size: 40px;
  font-weight: 500;
  text-decoration: none;
  transition: 0.2s ease all;

  :hover {
    color: ${Palette.PRIMARY_BLACK};
    cursor: pointer;
  }
`;
