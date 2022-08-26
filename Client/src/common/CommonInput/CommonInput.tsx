import React, { FC, HTMLInputTypeAttribute } from "react";
import { Input, InputContainer, Label } from "./styles";

interface Props {
  label: String;
  onChange: (e: any) => void;
  type?: HTMLInputTypeAttribute;
  name?: any;
  value?: any;
  placeholder?: HTMLInputTypeAttribute;
}

const CommonInput: FC<Props> = ({
  label,
  onChange,
  type,
  name,
  value,
  placeholder,
}) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <Input
        onChange={onChange}
        type={type}
        name={name}
        value={value}
        min={0}
        required={true}
        step="0.01"
        placeholder={placeholder}
      />
    </InputContainer>
  );
};

export default CommonInput;
