import React, { FC, HTMLInputTypeAttribute } from "react";
import { Input, InputContainer, Label } from "./styles";

interface Props {
  label: String;
  onChange: (e: any) => void;
  type?: HTMLInputTypeAttribute;
  name?: any;
}

const CommonInput: FC<Props> = ({ label, onChange, type, name }) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <Input onChange={onChange} type={type} name={name} />
    </InputContainer>
  );
};

export default CommonInput;
