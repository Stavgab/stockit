import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import {
  Body,
  Container,
  LoadingText,
  StocksTable,
} from "./styles";
import { SERVER_URL, STOCK_NEWS } from "../../utils/Consts";
import StockNewsListItem, { StockNewsProps } from "../StockNewsListItem/StockNewsListItem";

const StockNewsList: FC = () => {
  const [stockNews, setStocks] = useState<[StockNewsProps]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${SERVER_URL}${STOCK_NEWS}`)
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
          {stockNews &&
            stockNews.map((stockNews, index) => (
              <StockNewsListItem
                key={index}
                _id={stockNews._id}
                title={stockNews.title}
                description={stockNews.description}
                photo={stockNews.photo}
                author={stockNews.author}
                source={stockNews.source}
                date={stockNews.date}
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
