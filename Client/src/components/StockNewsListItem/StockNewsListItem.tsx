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
  Description,
  Sector,
} from "./styles";
import stock_img from "../../utils/img/stock_news_test.jpeg";
import { Button } from "@mui/material";
import { NEWS_ROUTE } from "../../utils/Consts";

export interface StockNewsProps {
  _id?: String;
  title: String;
  author: String;
  source: String;
  description: String;
  photo: String;
  sectors: String;
  date: String;
}

const StockNewsListItem: FC<StockNewsProps> = ({
  _id,
  title,
  author,
  source,
  description,
  date,
  sectors,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <ItemContainer onClick={() => navigate(`${NEWS_ROUTE}${_id}`)}>
        <PhotoContainer>
          <ImgTest src={stock_img} />
        </PhotoContainer>
        <BodyContainer>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Author>{author}</Author>
          <Source>{source}</Source>
          <Date>{date}</Date>
          <Sector>{sectors}</Sector>
        </BodyContainer>
      </ItemContainer>
      <Button onClick={() => navigate(`${"create"}`)}>Create</Button>
      <Button onClick={() => navigate(`${"update"}/${_id}`)}>Update</Button>
      <Button onClick={() => navigate(`${"delete"}`)}>Delete</Button>
    </>
  );
};

export default StockNewsListItem;
