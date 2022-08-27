import React, { FC, useContext } from "react";
import { Input, InputContainer } from "./styles";
import { BiSearch } from "react-icons/bi";
import { LiveSearchContext } from "../../context/Context";

const SearchBar: FC = () => {
  const { setIsLiveSearch } = useContext(LiveSearchContext);
  const onClick = (e: any) => {
    setIsLiveSearch(true);
  };

  return (
    <InputContainer>
      <Input placeholder="type something to search..." onClick={onClick} />
      <BiSearch size={20} />
    </InputContainer>
  );
};

export default SearchBar;
