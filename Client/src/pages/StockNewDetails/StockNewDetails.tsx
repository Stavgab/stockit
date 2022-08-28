import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StockType } from "../../common/enum/StockType";
import { CommonCenteredContainer } from "../../common/styles";
import { StockNewsProps } from "../../components/StockNewsListItem/StockNewsListItem";
import { NEWS_ROUTE, SERVER_URL, STOCK_ROUTE } from "../../utils/Consts";
import {
  Author,
  Company,
  Context,
  Date,
  Header,
  Sector,
  SectorContainer,
  Seperator,
  Source,
  SubtitleContainer,
  Title,
} from "./styles";

const StockNewDetails: FC = () => {
  const { id } = useParams();
  const [stockArticle, setStockArticle] = useState<StockNewsProps>();
  const [relatedStock, setRelatedStock] = useState<StockType>();
  useEffect(() => {
    axios
      .get(`${SERVER_URL}${NEWS_ROUTE}details/${id}`)
      .then((res) => {
        setStockArticle(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (stockArticle?.stocks)
      axios
        .get(`${SERVER_URL}${STOCK_ROUTE}details/${stockArticle.stocks}`)
        .then((res) => setRelatedStock(res.data))
        .catch((err) => console.log(err));
  }, [stockArticle]);
  return (
    <CommonCenteredContainer>
      {stockArticle && (
        <>
          <Header>
            <Title>{stockArticle.title}</Title>
            <SubtitleContainer>
              <Author>{stockArticle.author}</Author>
              <Date>{stockArticle.date}</Date>
            </SubtitleContainer>
            <Source href={stockArticle.source}>
              Click here for the original article
            </Source>
            <SectorContainer>
              <Sector>{stockArticle.sectors}</Sector>
              <Company to={`/${STOCK_ROUTE}${stockArticle.stocks}`}>
                {relatedStock?.company}
              </Company>
            </SectorContainer>
          </Header>
          <Seperator />
          <Context>{stockArticle.context}</Context>
        </>
      )}
    </CommonCenteredContainer>
  );
};

export default StockNewDetails;
