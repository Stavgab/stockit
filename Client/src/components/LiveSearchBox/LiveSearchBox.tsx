import React, { FC, useContext, useState } from "react";
import { CommonButton } from "../../common/styles";
import { LiveSearchContext, SearchStocksContext } from "../../context/Context";
import { ButtonColors } from "../../utils/Palette";
import {
  Button,
  CloseButton,
  Container,
  Input,
  InputContainer,
} from "./styles";

interface Props {
  onChange: (e: any) => void;
  inputValue: string;
  onClear: () => void;
}
const LiveSearchBox: FC<Props> = ({ onChange, onClear, inputValue }) => {
  const { setIsLiveSearch } = useContext(LiveSearchContext);
  const { isNews, setIsNews } = useContext(SearchStocksContext);

  const onClose = () => {
    setIsLiveSearch(false);
  };
  document.onkeyup = (e) => {
    if (e.code === "Escape") setIsLiveSearch(false);
  };
  const onSelect = () => {
    setIsNews(!isNews);
  };
  return (
    <Container>
      <div>
        <CloseButton size={40} onClick={onClose} />
      </div>
      <InputContainer>
        <Input
          placeholder={
            isNews
              ? "try to search something from our news..."
              : "you can try to search: AAPL or Apple"
          }
          onChange={onChange}
          autoFocus
          value={inputValue}
        />
        <Button isNews={!isNews} onClick={onSelect}>
          Stock
        </Button>
        <Button isNews={isNews} onClick={onSelect}>
          News
        </Button>
      </InputContainer>
      <CommonButton
        opposite={false}
        color={ButtonColors.BLACK}
        onClick={onClear}
      >
        Clear
      </CommonButton>
    </Container>
  );
};

export default LiveSearchBox;
