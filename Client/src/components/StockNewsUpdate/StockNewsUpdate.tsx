import { Button } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import {
  AuthorInput,
  ButtonContainer,
  CreateContainer,
  DateInput,
  DescriptionInput,
  Input,
  SourceInput,
  TitleInput,
} from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { NEWS_ROUTE, SERVER_URL } from "../../utils/Consts";
import axios from "axios";
import { StockNewsType } from "../../common/enum/StockNewsType";
import { Sector } from "../../common/enum/SectorType";

const StockNewsUpdate: FC = () => {
  const { id } = useParams();
  const [stockNews, setStockNews] = useState<StockNewsType>({
    _id: "",
    title: "",
    stockName: "",
    sectors: Sector.UNCLASSIFIED,
    description: "",
    author: "",
    source: "",
    date: "",
    stocks: [""],
  });

  useEffect(() => {
    axios
      .get(`${SERVER_URL}${NEWS_ROUTE}details/${id}`)
      .then((res) => {
        setStockNews(res.data);
        removeIdFromStockNews();
      })
      .catch((e) => console.log(e));
  }, []);

  const handleChange = (e: any) => {
    setStockNews({
      ...stockNews,
      [e.target.name]: e.target.value,
    });
  };
  const removeIdFromStockNews = () => {
    setStockNews((current) => {
      const { _id, ...rest } = current;
      return rest;
    });
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .put(`${SERVER_URL}${NEWS_ROUTE}update/${id}`, stockNews)
      .then((res) => {
        navigate("/stocknews");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigate = useNavigate();
  return (
    <>
      <CreateContainer>
        <TitleInput>
          <Input
            placeholder="Add Title"
            name="title"
            onChange={handleChange}
            type="string"
            value={stockNews.title}
          />
        </TitleInput>
        <DescriptionInput>
          <Input
            placeholder="Add Description"
            name="description"
            onChange={handleChange}
            type="string"
            value={stockNews.description}
          />
        </DescriptionInput>
        <AuthorInput>
          <Input
            placeholder="Add Author"
            name="author"
            onChange={handleChange}
            type="string"
            value={stockNews.author}
          />
        </AuthorInput>
        <SourceInput>
          <Input
            placeholder="Add Source"
            name="source"
            onChange={handleChange}
            type="string"
            value={stockNews.source}
          />
        </SourceInput>
        <DateInput>
          <Input
            placeholder="Add Date"
            name="date"
            onChange={handleChange}
            type="string"
            value={stockNews.date}
          />
        </DateInput>
      </CreateContainer>
      <ButtonContainer>
        <Button onClick={handleSubmit}>UPDATE</Button>
      </ButtonContainer>
    </>
  );
};

export default StockNewsUpdate;
