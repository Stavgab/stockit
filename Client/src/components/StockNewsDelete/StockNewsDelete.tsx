import { Button } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NEWS_ROUTE, SERVER_URL } from "../../utils/Consts";
import axios from "axios";
import {
  ButtonsContainer,
  CancelButton,
  DeleteButton,
  DeleteStockFormContainer,
  Label,
  PropContainer,
  StockDetailsContainer,
  Text,
  Title,
  TrashContainer,
} from "./styles";
import { BsTrash } from "react-icons/bs";
import { ErrorMessage, ErrorMessageContainer } from "../CreateStockForm/styles";
import { StockNewsType } from "../../common/enum/StockNewsType";

const StockNewsDelete: FC = () => {
  // const [stockNews, setStockNews] = useState({
  //   title: "",
  //   stockName: "",
  //   sectors: "",
  //   description: "",
  //   author: "",
  //   source: "",
  //   date: "",
  //   stocks: [""],
  // });

  const navigate = useNavigate();
  const [stockNews, setStockNews] = useState<StockNewsType>();
  const [isDeletedSuccessfully, setIsDeletedSuccessfully] = useState(false);
  useEffect(() => {
    axios.get(`${SERVER_URL}${NEWS_ROUTE}details/${id}`).then((response) => {
      setStockNews(response.data);
    });
  }, []);
  const { id } = useParams();

  const onDelete = () => {
    axios
      .delete(`${SERVER_URL}${NEWS_ROUTE}delete/${id}`)
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
      <Title>You are going to delete the following Article:</Title>
      <StockDetailsContainer>
        {stockNews && (
          <>
            <PropContainer>
              <Label>Title:</Label>
              <Text>{stockNews.title}</Text>
            </PropContainer>
            <PropContainer>
              <Label>Sector:</Label>
              <Text>{stockNews.sectors}</Text>
            </PropContainer>
            <PropContainer>
              <Label>Author:</Label>
              <Text>{stockNews.author}</Text>
            </PropContainer>
          </>
        )}
      </StockDetailsContainer>
      <Text>This will delete the Article permanently</Text>
      <Text>Are you sure?</Text>
      <ButtonsContainer>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <DeleteButton onClick={onDelete}>Delete</DeleteButton>
      </ButtonsContainer>
    </DeleteStockFormContainer>
  );
};

export default StockNewsDelete;
