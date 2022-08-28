import { BiSearch } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import styled from "styled-components";
import Palette from "../../utils/Palette";

export const Container = styled.div`
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: sticky;
  top: 0;
  background-color: white;
  height: 60px;
`;
export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
  padding: 5px 15px;
  border-radius: 50px;
  background-color: white;
  border: 0.5px solid ${Palette.BACKGROUND_GERY};
  :focus,
  :focus-visible,
  :focus-within {
    border: 0.5px solid ${Palette.PRIMARY_GERY};
  }
`;
export const Input = styled.input`
  background-color: transparent;
  border: none;
  width: 100%;
  height: 2rem;
  :focus,
  :focus-visible {
    outline: none;
  }
`;
export const SearchButton = styled(BiSearch)`
  cursor: pointer;
`;
export const CloseButton = styled(IoCloseOutline)`
  cursor: pointer;
  /* margin-right: 20px; */
  /* height: 40px;
  width: 40px; */
`;
interface ButtonProps {
  isNews: Boolean;
}
export const Button = styled.button<ButtonProps>`
  background-color: ${(p) => (p.isNews ? "green" : "transparent")};
  color: ${(p) => (p.isNews ? "white" : "black")};
  border: none;
  border-radius: 25px;
  padding: 7px 15px;
  cursor: pointer;
`;
