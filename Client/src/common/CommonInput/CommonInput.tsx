import React, { FC, HTMLInputTypeAttribute } from "react";
import { Input, InputContainer, Label } from "./styles";

interface Props {
  label: String;
  onChange: (e: any) => void;
  type?: HTMLInputTypeAttribute;
  name?: any;
  value?: any;
}

const CommonInput: FC<Props> = ({ label, onChange, type, name, value }) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <Input onChange={onChange} type={type} name={name} value={value} />
    </InputContainer>
  );
};

export default CommonInput;
