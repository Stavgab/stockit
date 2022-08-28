import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { Body, Container, LoadingText, StocksTable } from "./styles";
import { NEWS_ROUTE, SERVER_URL } from "../../utils/Consts";
import StockNewsListItem, {
  StockNewsProps,
} from "../StockNewsListItem/StockNewsListItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StockNewsList: FC = () => {
  const [stockNews, setStocks] = useState<[StockNewsProps]>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${SERVER_URL}${NEWS_ROUTE}`)
      .then((res) => {
        setStocks(res.data);
        setIsLoading(false);
      })
      .catch((e) => console.log("Error while loading data from server"));
  }, []);

  return (
    <Container>
      <StocksTable>
        <Body>
          <Button onClick={() => navigate(`${"create"}`)}>
            new stock News
          </Button>
          {stockNews &&
            stockNews.map((stockNews, index) => (
              <StockNewsListItem
                key={index}
                _id={stockNews._id}
                title={stockNews.title}
                photo={stockNews.photo}
                author={stockNews.author}
                source={stockNews.source}
                date={stockNews.date}
                sectors={stockNews.sectors}
                context={stockNews.context}
              />
            ))}
        </Body>
      </StocksTable>
      {isLoading && (
        <LoadingText>Please wait while loading data...</LoadingText>
      )}
    </Container>
  );
};

export default StockNewsList;
