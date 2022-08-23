import { Button } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { BodyContainer, Container, TitleContainer } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_URL, STOCK_NEWS } from "../../utils/Consts";
import axios from "axios";

const StockNewsCreate: FC = () => {
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
    console.log(id);
    axios.get(`${SERVER_URL}news/${id}`)
        .then(response => {
            setStockNews(response.data);
        });
  },[]);
  const {id} = useParams();
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .post(`${SERVER_URL}news/${id}/delete`)
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
          <TitleContainer>
              Would you like to delete that news?
          </TitleContainer>
          <BodyContainer>
            <p>{stockNews.title}</p>
            <p>{stockNews.stockName}</p>
            <p>{stockNews.sectors}</p>
            <p>{stockNews.author}</p>
            <p>{stockNews.source}</p>
            <p>{stockNews.date}</p>
          </BodyContainer>
          <Button onClick={handleSubmit} >YES</Button>
          <Button onClick={() => navigate("/")} >NO</Button>
      </Container>
      </>
    );
  };

export default StockNewsCreate;