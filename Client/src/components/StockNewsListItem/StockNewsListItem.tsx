import React, { FC} from "react";
import { Link, useNavigate } from "react-router-dom";
import { STOCK_NEWS} from "../../utils/Consts";
import { BodyContainer, ItemContainer, PhotoContainer, ImgTest, Title, Author, Source, Date, Description, Sector } from "./styles";
import stock_img from "../../utils/img/stock_news_test.jpeg"
import { Button } from "@mui/material";

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
    <ItemContainer onClick={() => navigate(`${STOCK_NEWS}${_id}`)} >
        <PhotoContainer>
        <ImgTest src={stock_img}/>
        </PhotoContainer>
        <BodyContainer >
            <Title>
              {title}
            </Title>
            <Description>
              {description}
            </Description>
            <Author>
            {author}
            </Author>
            <Source>
            {source}
            </Source>
            <Date>
            {date}
            </Date>
            <Sector>
            {sectors}
            </Sector>
        </BodyContainer>
    </ItemContainer>
    <Button onClick={() => navigate(`${'create'}`)} >Create</Button>
    <Button onClick={() => navigate(`${'update'}`)} >Update</Button>
    <Button onClick={() => navigate(`${'delete'}`)} >Delete</Button>
    </>
  );
};

export default StockNewsListItem;
