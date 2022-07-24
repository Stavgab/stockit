import React, { FC, useEffect, useState } from "react";
import { StockType } from "../../common/enum/StockType";
import { CommonCenteredContainer } from "../../common/styles";
import StockGraph from "../StockGraph/StockGraph";
import {
  DetailsGrid,
  GraphContainer,
  DetailContainer,
  Title,
  Detail,
} from "./styles";

const StockView: FC<StockType> = ({
  ticker,
  company,
  price,
  marketCap,
  sector,
  location,
  stockHistory,
  news,
}) => {
  // Temp State
  const [stock, setStock] = useState<StockType>();
  useEffect(() => {
    setStock({ ticker, company, price, marketCap, sector });
  }, []);
  // Temp State
  return (
    <CommonCenteredContainer>
      <DetailsGrid>
        {stock &&
          Object.keys(stock).map((key: string, index) => {
            return (
              <DetailContainer key={index}>
                <Title>{key}</Title>
                <Detail>{stock[key as keyof StockType]}</Detail>
              </DetailContainer>
            );
          })}
      </DetailsGrid>
      <GraphContainer>
        <StockGraph />
      </GraphContainer>
    </CommonCenteredContainer>
  );
};

export default StockView;
