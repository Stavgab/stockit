import React, { FC, useEffect, useState } from "react";
import StocksListItem, { StockProps } from "../StocksListItem/StocksListItem";
import { Body, Container, Header, StocksTable, Th, Tr } from "./styles";

const StocksList: FC = () => {
  const [stocks, setStocks] = useState<[StockProps]>();

  useEffect(() => {
    console.log(
      "Need to complete the GET method for fetching the data from the server!!"
    );
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
            stocks.map((stock) => (
              <StocksListItem
                ticker={stock.ticker}
                company={stock.company}
                price={stock.price}
                marketCap={stock.marketCap}
                sector={stock.sector}
              />
            ))}
        </Body>
      </StocksTable>
    </Container>
  );
};

export default StocksList;
