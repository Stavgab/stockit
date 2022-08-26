import styled from "styled-components";
import Palette from "../../utils/Palette";

export const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
`;

export const FormContainer = styled.div`
  background-color: red;
`;
export const InputContainer = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Title = styled.h1`
  color: ${Palette.PRIMARY_BLACK};
  font-size: 38px;
  font-weight: 500;
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
export const StockName = styled.select`
  padding: 7px 10px;
  border-radius: 2px;
`;

export const SubmitButton = styled.button`
  padding: 5px 10px;
`;
