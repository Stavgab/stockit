import axios from "axios";
import React, { useEffect, useState } from "react";
import StockNewsList from "../../components/StockNewsList/StockNewsList";
import { StockNewsProps } from "../../components/StockNewsListItem/StockNewsListItem";
import { NEWS_ROUTE, SERVER_URL } from "../../utils/Consts";
import { LoadingText } from "./styles";

const StockNews = () => {
  const [stockNews, setStocks] = useState<StockNewsProps[]>();
  const [isLoading, setIsLoading] = useState(false);
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
  return isLoading ? (
    <LoadingText>Please wait while loading data...</LoadingText>
  ) : stockNews ? (
    <StockNewsList stockNews={stockNews} isShow />
  ) : null;
};

export default StockNews;
