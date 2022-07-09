import styled from "styled-components";
import Palette from "../../utils/Palette";

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 15px;
  border-radius: 50px;
  border: 0.5px solid ${Palette.BACKGROUND_GERY};
  :focus,
  :focus-visible,
  :focus-within {
    border: 0.5px solid ${Palette.PRIMARY_GERY};
  }
`;

export const Input = styled.input`
  background: none;
  border: none;
  width: 50vw;
  height: 2rem;

  :focus {
    outline: none;
  }
`;
