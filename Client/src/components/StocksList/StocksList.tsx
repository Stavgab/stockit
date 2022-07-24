import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import StocksListItem, { StockProps } from "../StocksListItem/StocksListItem";
import {
  Body,
  Container,
  Header,
  LoadingText,
  StocksTable,
  Th,
  Tr,
} from "./styles";
import { SERVER_URL, STOCK_ROUTE } from "../../utils/Consts";

const StocksList: FC = () => {
  const [stocks, setStocks] = useState<[StockProps]>();
  const [isLoading, setIsLoading] = useState(false);

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
    <Container>
      <StocksTable>
        <Header>
          <Tr>
            <Th>Ticker</Th>
            <Th>Company</Th>
            <Th>Price</Th>
            <Th>Market Cap</Th>
            <Th>Sector</Th>
          </Tr>
        </Header>
        <Body>
          {stocks &&
            stocks.map((stock, index) => (
              <StocksListItem
                key={index}
                _id={stock._id}
                ticker={stock.ticker}
                company={stock.company}
                price={stock.price}
                marketCap={stock.marketCap}
                sector={stock.sector}
              />
            ))}
        </Body>
      </StocksTable>
      {isLoading && (
        <LoadingText>Please wait while loading data...</LoadingText>
      )}
    </Container>
  );
};

export default StocksList;
