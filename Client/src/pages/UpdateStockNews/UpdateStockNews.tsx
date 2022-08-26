import React, { FC } from "react";
import { CommonCenteredContainer } from "../../common/styles";
import StockNewsCreate from "../../components/StockNewsCreate/StockNewsCreate";
import StockNewsUpdate from "../../components/StockNewsUpdate/StockNewsUpdate";

const UpdateStockNews: FC = () => {
  return (
    <CommonCenteredContainer>
      <StockNewsUpdate />
    </CommonCenteredContainer>
  );
};

export default UpdateStockNews;
