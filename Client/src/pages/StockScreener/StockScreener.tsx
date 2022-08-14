import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { CommonCenteredContainer } from "../../common/styles";
import StocksList from "../../components/StocksList/StocksList";
import { SERVER_URL, STOCK_ROUTE } from "../../utils/Consts";
import { Head, NewStockButton, Title } from "./styles";

const StockScreener: FC = () => {
  const navigate = useNavigate();
  return (
    <CommonCenteredContainer>
      <Head>
        <Title>StockScreener</Title>
        <NewStockButton onClick={() => navigate(`${STOCK_ROUTE}create`)}>
          New Stock
        </NewStockButton>
      </Head>
      <StocksList />
    </CommonCenteredContainer>
  );
};

export default StockScreener;
