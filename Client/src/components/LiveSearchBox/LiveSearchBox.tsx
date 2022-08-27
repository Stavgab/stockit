import React, { FC, useContext } from "react";
import { LiveSearchContext, SearchStocksContext } from "../../context/Context";
import { CloseButton, Container, Input, InputContainer } from "./styles";

interface Props {
  onChange: (e: any) => void;
}
const LiveSearchBox: FC<Props> = ({ onChange }) => {
  const { isLiveSearch, setIsLiveSearch } = useContext(LiveSearchContext);
  const { setStocks } = useContext(SearchStocksContext);
  const onClose = () => {
    setIsLiveSearch(false);
  };
  const onClear = () => {
    setStocks([]);
  };
  document.onkeyup = (e) => {
    if (e.code === "Escape") setIsLiveSearch(false);
  };

  return (
    <Container>
      <div>
        <CloseButton size={40} onClick={onClose} />
      </div>
      <InputContainer>
        <Input
          placeholder="you can try to search: AAPL or other ticker"
          onChange={onChange}
          autoFocus
        />
      </InputContainer>
      <button onClick={onClear}>Clear</button>
    </Container>
  );
};

export default LiveSearchBox;
