import React, { FC } from "react";
import { CommonCenteredContainer } from "../../common/styles";
import StockNewsCreate from "../../components/StockNewsCreate/StockNewsCreate";

const CreateStockNews: FC = () => {
  return (
    <CommonCenteredContainer>
      <StockNewsCreate />
    </CommonCenteredContainer>
  );
};

export default CreateStockNews;
