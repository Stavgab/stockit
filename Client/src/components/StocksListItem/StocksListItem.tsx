import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Sector } from "../../common/enum/SectorType";
import { STOCK_ROUTE } from "../../utils/Consts";
import { Td, Tr } from "./styles";

export interface StockProps {
  _id?: string;
  ticker: string;
  company: string;
  price: number;
  marketCap: number;
  sector: Sector;
}

const StocksListItem: FC<StockProps> = ({
  _id,
  ticker,
  company,
  price,
  marketCap,
  sector,
}) => {
  let normalizedMarketCap;
  if (marketCap / 1000000000000 > 1)
    normalizedMarketCap = "$" + marketCap / 1000000000000 + "T";
  else if (marketCap / 1000000000 > 1)
    normalizedMarketCap = "$" + marketCap / 1000000000 + "B";
  else if (marketCap / 1000000 > 1)
    normalizedMarketCap = "$" + marketCap / 1000000 + "M";

  const navigate = useNavigate();
  return (
    <Tr onClick={() => navigate(`${STOCK_ROUTE}${_id}`)}>
      <Td>{ticker}</Td>
      <Td>{company}</Td>
      <Td>{String(price)}</Td>
      <Td>{normalizedMarketCap}</Td>
      <Td>{sector}</Td>
    </Tr>
  );
};

export default StocksListItem;
