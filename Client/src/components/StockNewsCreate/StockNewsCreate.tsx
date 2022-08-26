import React, { FC, useEffect, useState } from "react";
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
import { NEWS_ROUTE, SERVER_URL, STOCK_ROUTE } from "../../utils/Consts";
import axios from "axios";
import { StockType } from "../../common/enum/StockType";
import CommonInput from "../../common/CommonInput/CommonInput";
import { useNavigate } from "react-router-dom";
import { StockNewsType } from "../../common/enum/StockNewsType";
import { Sector } from "../../common/enum/SectorType";

const StockNewsCreate: FC = () => {
  const [stockNews, setStockNews] = useState<StockNewsType>({
    title: "",
    stockName: "",
    sectors: Sector.UTILITIES,
    author: "",
    source: "",
    date: new Date(),
    stocks: [""],
  });

  const [stocks, setStocks] = useState<[StockType]>();
  const [isError, setIsError] = useState<Boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setStockNews({
      ...stockNews,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .post(`${SERVER_URL}${NEWS_ROUTE}`, stockNews)
      .then((res) => {
        setIsError(false);
        navigate("/");
      })
      .catch((error) => {
        setIsError(true);
        console.log(error);
      });
  };
  const reloadPage = () => {
    setIsError(false);
    navigate(0);
  };
  useEffect(() => {
    axios.get(`${SERVER_URL}${STOCK_ROUTE}`).then((response) => {
      setStocks(response.data);
    });
  }, []);

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
            <Title>Add Stock News</Title>
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
            <SubmitButton type="submit">Add</SubmitButton>
          </Form>
        </>
      )}
    </>
  );
};

export default StockNewsCreate;
