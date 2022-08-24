import { Button } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { BodyContainer, Container, TitleContainer } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { NEWS_ROUTE, SERVER_URL } from "../../utils/Consts";
import axios from "axios";

const StockNewsDelete: FC = () => {
  const [stockNews, setStockNews] = useState({
    title: "",
    stockName: "",
    sectors: "",
    description: "",
    author: "",
    source: "",
    date: "",
    stocks: [""],
  });
  useEffect(() => {
    axios.get(`${SERVER_URL}${NEWS_ROUTE}details/${id}`).then((response) => {
      setStockNews(response.data);
    });
  }, []);
  const { id } = useParams();
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .delete(`${SERVER_URL}${NEWS_ROUTE}delete/${id}`)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();
  return (
    <>
      <Container>
        <TitleContainer>Would you like to delete that news?</TitleContainer>
        <BodyContainer>
          <p>{stockNews.title}</p>
          <p>{stockNews.stockName}</p>
          <p>{stockNews.sectors}</p>
          <p>{stockNews.author}</p>
          <p>{stockNews.source}</p>
          <p>{stockNews.date}</p>
        </BodyContainer>
        <Button onClick={handleSubmit}>YES</Button>
        <Button onClick={() => navigate("/")}>NO</Button>
      </Container>
    </>
  );
};

export default StockNewsDelete;
