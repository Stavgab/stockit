import React, { FC } from "react";
import { SectorType } from "../../common/enum/SectorType";
import { CommonCenteredContainer } from "../../common/styles";
import StockView from "../../components/StockView/StockView";

const StockDetails: FC = () => {
  return (
    <CommonCenteredContainer>
      <StockView
        ticker="STAV"
        company="Gabay&Co"
        price={300000}
        marketCap={79524}
        sector={SectorType.INDUSTRIALS}
      />
    </CommonCenteredContainer>
  );
};

export default StockDetails;
