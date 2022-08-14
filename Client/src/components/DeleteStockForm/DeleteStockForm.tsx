import React, { FC, useEffect, useState } from "react";
import {
  ButtonsContainer,
  CancelButton,
  DeleteButton,
  DeleteStockFormContainer,
  StockDetailsContainer,
  Text,
  Title,
  TrashContainer,
} from "./styles";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { SERVER_URL, STOCK_ROUTE } from "../../utils/Consts";
import { StockType } from "../../common/enum/StockType";
import StockView from "../StockView/StockView";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, ErrorMessageContainer } from "../CreateStockForm/styles";
interface Props {
  stockId: String;
}
const DeleteStockForm: FC<Props> = ({ stockId }) => {
  const navigate = useNavigate();
  const [stock, setStock] = useState<StockType>();
  const [isDeletedSuccessfully, setIsDeletedSuccessfully] = useState(false);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}${STOCK_ROUTE}${stockId}`)
      .then((res) => {
        setStock(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onDelete = () => {
    axios
      .delete(`${SERVER_URL}${STOCK_ROUTE}${stockId}/delete`)
      .then((res) => {
        setIsDeletedSuccessfully(true);

        setTimeout(() => navigate("/"), 2000);
      })
      .catch((err) => {
        setIsDeletedSuccessfully(false);
      });
  };

  const onCancel = () => {
    navigate(-1);
  };
  return isDeletedSuccessfully ? (
    <ErrorMessageContainer>
      <ErrorMessage>The stock has been successfully deleted!</ErrorMessage>
      <ErrorMessage>please wait while you are redirected</ErrorMessage>
    </ErrorMessageContainer>
  ) : (
    <DeleteStockFormContainer>
      <TrashContainer>
        <BsTrash size={50} color="red" />
      </TrashContainer>
      <Title>You are going to delete the following stock:</Title>
      <StockDetailsContainer>
        {stock && (
          <StockView
            ticker={stock.ticker}
            company={stock.company}
            price={stock.price}
            marketCap={stock.marketCap}
            sector={stock.sector}
            location={stock.location}
          />
        )}
      </StockDetailsContainer>
      <Text>This will delete the stock permanently</Text>
      <Text>Are you sure?</Text>
      <ButtonsContainer>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <DeleteButton onClick={onDelete}>Delete</DeleteButton>
      </ButtonsContainer>
    </DeleteStockFormContainer>
  );
};

export default DeleteStockForm;
