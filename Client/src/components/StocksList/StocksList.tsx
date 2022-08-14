import React, { FC } from "react";
import StocksListItem, { StockProps } from "../StocksListItem/StocksListItem";
import { Body, Container, Header, StocksTable, Th, Tr } from "./styles";

interface Props {
  stocks: StockProps[];
}
const StocksList: FC<Props> = ({ stocks }) => {
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
    </Container>
  );
};

export default StocksList;
