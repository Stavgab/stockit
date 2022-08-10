import React, { FC } from "react";
import { CommonCenteredContainer } from "../../common/styles";
import CreateStockForm from "../../components/CreateStockForm/CreateStockForm";

const CreateStock: FC = () => {
  return (
    <CommonCenteredContainer>
      <CreateStockForm />
    </CommonCenteredContainer>
  );
};

export default CreateStock;
