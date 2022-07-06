import styled from "styled-components";
import Palette from "../../utils/Palette";

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  border-bottom: 1px ${Palette.BACKGROUND_GERY} solid;
`;
export const Logo = styled.h1`
  color: ${Palette.PRIMARY_GERY};
  font-size: 30px;
  font-weight: 500;
  transition: 0.2s ease all;

  :hover {
    color: ${Palette.PRIMARY_BLACK};
    cursor: pointer;
  }
`;
export const NavbarList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 60%;
  height: 100%;
`;
export const NavbarLink = styled.li`
  list-style: none;
  font-weight: 300;
  height: 100%;
  display: flex;
  align-items: center;
  width: inherit;
`;
