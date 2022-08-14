import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { CommonCenteredContainer } from "../../common/styles";
import UpdateStockForm from "../../components/UpdateStockForm/UpdateStockForm";

const UpdateStock: FC = () => {
  const { id } = useParams();
  return (
    <CommonCenteredContainer>
      <UpdateStockForm id={id!} />
    </CommonCenteredContainer>
  );
};

export default UpdateStock;
