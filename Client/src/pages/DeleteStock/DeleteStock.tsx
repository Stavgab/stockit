import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { CommonCenteredContainer } from "../../common/styles";
import DeleteStockForm from "../../components/DeleteStockForm/DeleteStockForm";

const DeleteStock: FC = () => {
  let { id } = useParams();
  return (
    <CommonCenteredContainer
      style={{ height: "100%", justifyContent: "center" }}
    >
      <DeleteStockForm stockId={id!} />
    </CommonCenteredContainer>
  );
};

export default DeleteStock;
