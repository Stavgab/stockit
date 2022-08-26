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

export interface StockNewsProps {
  _id?: String;
  title: String;
  author: String;
  source: String;
  photo: String;
  sectors: String;
  date: String;
}

const StockNewsListItem: FC<StockNewsProps> = ({
  _id,
  title,
  author,
  source,
  date,
  sectors,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <ItemContainer>
        <PhotoContainer>
          <ImgTest src={stock_img} />
        </PhotoContainer>
        <BodyContainer>
          <Title>{title}</Title>
          <Author>{author}</Author>
          <Source>{source}</Source>
          <Date>{date}</Date>
          <Sector>{sectors}</Sector>
        </BodyContainer>
      </ItemContainer>
      <Button onClick={() => navigate(`${"update"}/${_id}`)}>Update</Button>
      <Button onClick={() => navigate(`${"delete"}/${_id}`)}>Delete</Button>
    </>
  );
};

export default StockNewsListItem;
