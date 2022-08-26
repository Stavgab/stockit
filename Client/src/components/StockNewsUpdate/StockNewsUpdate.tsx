import { Button } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NEWS_ROUTE, SERVER_URL, STOCK_ROUTE } from "../../utils/Consts";
import axios from "axios";
import { StockNewsType } from "../../common/enum/StockNewsType";
import { Sector } from "../../common/enum/SectorType";
import {
  ErrorMessage,
  ErrorMessageContainer,
  Form,
  InputContainer,
  ReloadButton,
  StockName,
  SubmitButton,
  Title,
} from "./styles";
import CommonInput from "../../common/CommonInput/CommonInput";
import { StockType } from "../../common/enum/StockType";

const StockNewsUpdate: FC = () => {
  const { id } = useParams();
  const [stockNews, setStockNews] = useState<StockNewsType>({
    _id: "",
    title: "",
    stockName: "",
    sectors: Sector.UNCLASSIFIED,
    author: "",
    source: "",
    date: new Date(),
    stocks: [""],
  });
  const [isError, setIsError] = useState<Boolean>(false);
  const [stocks, setStocks] = useState<[StockType]>();

  useEffect(() => {
    axios
      .get(`${SERVER_URL}${NEWS_ROUTE}details/${id}`)
      .then((res) => {
        setStockNews(res.data);
        removeIdFromStockNews();
      })
      .catch((e) => console.log(e));
    axios.get(`${SERVER_URL}${STOCK_ROUTE}`).then((response) => {
      setStocks(response.data);
    });
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

  const reloadPage = () => {
    setIsError(false);
    navigate(0);
  };

  return (
    <>
      {isError ? (
        <ErrorMessageContainer>
          <ErrorMessage>Something went wrong!</ErrorMessage>
          <ErrorMessage>Please try again</ErrorMessage>
          <ReloadButton onClick={reloadPage}>Reload</ReloadButton>
        </ErrorMessageContainer>
      ) : (
        <>
          <Form onSubmit={handleSubmit}>
            <Title>Edit Stock News</Title>
            <CommonInput
              label="Add Title"
              type="string"
              name="title"
              value={stockNews.title}
              onChange={handleChange}
            />
            <InputContainer>
              <label>Choose Stock</label>
              <StockName name="stocks" id="selectList" onChange={handleChange}>
                {stocks &&
                  stocks.map((stocks, i) => {
                    return (
                      <option key={i} value={stocks._id}>
                        {stocks.ticker}
                      </option>
                    );
                  })}
              </StockName>
            </InputContainer>
            <CommonInput
              label="Add Sector"
              type="string"
              name="sectors"
              value={stockNews.sectors}
              onChange={handleChange}
            />
            <CommonInput
              label="Add Author"
              type="string"
              name="author"
              value={stockNews.author}
              onChange={handleChange}
            />
            <CommonInput
              label="Add Source"
              type="string"
              name="source"
              value={stockNews.source}
              onChange={handleChange}
            />
            <CommonInput
              label="Add Date"
              type="date"
              name="date"
              value={stockNews.date}
              onChange={handleChange}
            />
            <SubmitButton type="submit">Save</SubmitButton>
          </Form>
        </>
      )}
    </>
  );
};

export default StockNewsUpdate;
