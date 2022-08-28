import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  BodyContainer,
  ItemContainer,
  PhotoContainer,
  ImgTest,
  Title,
  Author,
  Source,
  Date,
  Sector,
} from "./styles";
import stock_img from "../../utils/img/stock_news_test.jpeg";
import { Button } from "@mui/material";
import { NEWS_ROUTE } from "../../utils/Consts";

export interface StockNewsProps {
  _id?: string;
  title: string;
  author: string;
  source: string;
  photo: string;
  sectors: string;
  date: string;
  context: string;
  stocks?: string;
}

const StockNewsListItem: FC<StockNewsProps> = ({
  _id,
  title,
  author,
  source,
  date,
  sectors,
  context,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <ItemContainer onClick={() => navigate(`/stocknews/${_id}`)}>
        <PhotoContainer>
          <ImgTest src={stock_img} />
        </PhotoContainer>
        <BodyContainer>
          <Title>{title}</Title>
          <Author>{author}</Author>
          <Date>{date}</Date>
          <Sector>{sectors}</Sector>
        </BodyContainer>
      </ItemContainer>
      <button
        style={{ zIndex: 0 }}
        onClick={() => navigate(`${"update"}/${_id}`)}
      >
        Update
      </button>
      <button
        style={{ zIndex: 0 }}
        onClick={() => navigate(`${"delete"}/${_id}`)}
      >
        Delete
      </button>
    </>
  );
};

export default StockNewsListItem;
