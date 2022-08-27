import React, { FC } from "react";
import LiveSearchResultListItem from "../LiveSearchResultListItem/LiveSearchResultListItem";
import { StockProps } from "../StocksListItem/StocksListItem";
import { Body, Container, Header, StocksTable, Th, Tr } from "./styles";

interface Props {
  stocks: StockProps[];
}
const LiveSearchResultList: FC<Props> = ({ stocks }) => {
  return (
    <Container>
      {stocks.length > 0 ? (
        <StocksTable>
          <Header>
            <Tr>
              <Th>Ticker</Th>
              <Th>Company</Th>
              <Th>Price ($)</Th>
              <Th>Market Cap</Th>
              <Th>Sector</Th>
            </Tr>
          </Header>
          <Body>
            {stocks.map((stock, index) => (
              <LiveSearchResultListItem
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
      ) : (
        ""
      )}
    </Container>
  );
};

export default LiveSearchResultList;
