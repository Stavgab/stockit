import styled from "styled-components";
import { ButtonColors } from "../utils/Palette";

export const CommonCenteredContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
interface ButtonProps {
  color: string;
  opposite: boolean;
}
export const CommonButton = styled.button<ButtonProps>`
  color: ${(p) => (p.opposite ? p.color : "white")};
  background-color: ${(p) => (!p.opposite ? p.color : "white")};
  border: 2px solid ${(p) => (p.opposite ? p.color : p.color)};
  padding: 5px 10px;
  border-radius: 5px;
  transition: 0.1s ease all;
  cursor: pointer;
  font-weight: 400;
  font-size: 17px;
  :hover {
    color: ${(p) => (!p.opposite ? p.color : "white")};
    background-color: ${(p) => (p.opposite ? p.color : "white")};
    border-radius: 5px;
  }
`;
