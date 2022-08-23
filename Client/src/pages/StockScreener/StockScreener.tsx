import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonCenteredContainer } from "../../common/styles";
import StocksFilters from "../../components/StocksFilters/StocksFilters";
import { StockProps } from "../../components/StocksListItem/StocksListItem";
import { SERVER_URL, STOCK_ROUTE } from "../../utils/Consts";
import { Head, LoadingText, NewStockButton, Title } from "./styles";

const StockScreener: FC = () => {
  const [stocks, setStocks] = useState<StockProps[]>();
  const [isLoading, setIsLoading] = useState<Boolean>();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${SERVER_URL}${STOCK_ROUTE}`)
      .then((res) => {
        setStocks(res.data);
        setIsLoading(false);
      })
      .catch((e) => console.log("Error while loading data from server"));
  }, []);
  return (
    <CommonCenteredContainer>
      <Head>
        <Title>Stock Screen</Title>
        <NewStockButton onClick={() => navigate(`${STOCK_ROUTE}create`)}>
          New Stock
        </NewStockButton>
      </Head>
      {isLoading ? (
        <LoadingText>Please wait while loading data...</LoadingText>
      ) : (
        <StocksFilters stocks={stocks!} />
      )}
    </CommonCenteredContainer>
  );
};

export default StockScreener;
