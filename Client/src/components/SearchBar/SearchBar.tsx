import React, { FC } from "react";
import { Input, InputContainer } from "./styles";
import { BiSearch } from "react-icons/bi";

const SearchBar: FC = () => {
  return (
    <InputContainer>
      <Input placeholder="type something to search..." />
      <BiSearch size={20} />
    </InputContainer>
  );
};

export default SearchBar;
