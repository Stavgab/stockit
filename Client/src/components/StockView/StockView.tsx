import React, { FC, useEffect, useState } from "react";
import { Sector } from "../../common/enum/SectorType";
import { StockType } from "../../common/enum/StockType";
import { CommonCenteredContainer } from "../../common/styles";
import { DetailsGrid, DetailContainer, Title, Detail } from "./styles";

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
  const [stock, setStock] = useState<StockType>();
  useEffect(() => {
    setStock({ ticker, company, price, marketCap, sector, location });
  }, []);
  return (
    <CommonCenteredContainer>
      <DetailsGrid>
        {stock &&
          Object.keys(stock).map((key: string, index) => {
            return (
              <DetailContainer key={index}>
                <Title>{key}</Title>
                <Detail>
                  {key === "sector" ? sector : stock[key as keyof StockType]}
                </Detail>
              </DetailContainer>
            );
          })}
      </DetailsGrid>
    </CommonCenteredContainer>
  );
};

export default StockView;
