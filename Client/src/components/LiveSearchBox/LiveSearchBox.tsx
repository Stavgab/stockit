import React, { FC, useContext, useState } from "react";
import { LiveSearchContext, SearchStocksContext } from "../../context/Context";
import {
  Button,
  CloseButton,
  Container,
  Input,
  InputContainer,
} from "./styles";

interface Props {
  onChange: (e: any) => void;
}
const LiveSearchBox: FC<Props> = ({ onChange }) => {
  const { isLiveSearch, setIsLiveSearch } = useContext(LiveSearchContext);
  const { setStocks, isNews, setIsNews } = useContext(SearchStocksContext);

  const onClose = () => {
    setIsLiveSearch(false);
  };
  const onClear = () => {
    setStocks([]);
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
        />
        <Button isNews={!isNews} onClick={onSelect}>
          Stock
        </Button>
        <Button isNews={isNews} onClick={onSelect}>
          News
        </Button>
      </InputContainer>
      <button onClick={onClear}>Clear</button>
    </Container>
  );
};

export default LiveSearchBox;
