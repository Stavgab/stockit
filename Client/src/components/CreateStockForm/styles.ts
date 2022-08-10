import styled from "styled-components";
import Palette from "../../utils/Palette";

export const Title = styled.h1`
  color: ${Palette.PRIMARY_BLACK};
  font-size: 40px;
  font-weight: 500;
`;
export const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
`;

export const SubmitButton = styled.button`
  padding: 5px 10px;
`;

export const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

export const ErrorMessage = styled.h2`
  font-weight: 300;
`;

export const ReloadButton = styled.button`
  padding: 5px 10px;
  margin-top: 50px;
`;

export const SelectionMenu = styled.select`
  padding: 7px 10px;
  border-radius: 2px;
`;
