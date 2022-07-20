import React, { FC } from "react";
import { SectorType } from "../../common/enum/SectorType";
import { Td, Tr } from "./styles";

export interface StockProps {
  ticker: String;
  company: String;
  price: Number;
  marketCap: Number;
  sector: SectorType;
}

const StocksListItem: FC<StockProps> = ({
  ticker,
  company,
  price,
  marketCap,
  sector,
}) => {
  return (
    <Tr>
      <Td>{ticker}</Td>
      <Td>{company}</Td>
      <Td>{String(price)}</Td>
      <Td>{String(marketCap)}</Td>
      <Td>{sector}</Td>
    </Tr>
  );
};

export default StocksListItem;
