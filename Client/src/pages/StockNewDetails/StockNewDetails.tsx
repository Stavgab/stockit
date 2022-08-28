import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommonCenteredContainer } from "../../common/styles";
import { StockNewsProps } from "../../components/StockNewsListItem/StockNewsListItem";
import { NEWS_ROUTE, SERVER_URL } from "../../utils/Consts";
import {
  Author,
  Context,
  Date,
  Header,
  Sector,
  Seperator,
  Source,
  SubtitleContainer,
  Title,
} from "./styles";

const StockNewDetails: FC = () => {
  const { id } = useParams();
  const [stockArticle, setStockArticle] = useState<StockNewsProps>();
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

            <Sector>{stockArticle.sectors}</Sector>
          </Header>
          <Seperator />
          <Context>{stockArticle.context}</Context>
        </>
      )}
    </CommonCenteredContainer>
  );
};

export default StockNewDetails;
