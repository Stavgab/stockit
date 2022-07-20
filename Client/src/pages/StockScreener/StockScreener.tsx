import React, { FC } from "react";
import { CommonCenteredContainer } from "../../common/styles";
import StocksList from "../../components/StocksList/StocksList";
import { Title } from "./styles";

const StockScreener: FC = () => {
  return (
    <CommonCenteredContainer>
      <Title>StockScreener</Title>
      <StocksList />
    </CommonCenteredContainer>
  );
};

export default StockScreener;
