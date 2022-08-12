import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Sector } from "../../common/enum/SectorType";
import { STOCK_ROUTE } from "../../utils/Consts";
import { Td, Tr } from "./styles";

export interface StockProps {
  _id?: string;
  ticker: String;
  company: String;
  price: Number;
  marketCap: Number;
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
  const navigate = useNavigate();
  return (
    <Tr onClick={() => navigate(`${STOCK_ROUTE}${_id}`)}>
      <Td>{ticker}</Td>
      <Td>{company}</Td>
      <Td>{String(price)}</Td>
      <Td>{String(marketCap)}</Td>
      <Td>{Sector[sector]}</Td>
    </Tr>
  );
};

export default StocksListItem;
