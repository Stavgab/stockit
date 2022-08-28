import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import {
  Body,
  Container,
  LoadingText,
  NewStockButton,
  StocksTable,
} from "./styles";
import { NEWS_ROUTE, SERVER_URL } from "../../utils/Consts";
import StockNewsListItem, {
  StockNewsProps,
} from "../StockNewsListItem/StockNewsListItem";
import { useNavigate } from "react-router-dom";

interface Props {
  stockNews: StockNewsProps[];
}
const StockNewsList: FC<Props> = ({ stockNews }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <StocksTable>
        <Body>
          <NewStockButton onClick={() => navigate(`${"create"}`)}>
            add new stock News
          </NewStockButton>
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
    </Container>
  );
};

export default StockNewsList;
