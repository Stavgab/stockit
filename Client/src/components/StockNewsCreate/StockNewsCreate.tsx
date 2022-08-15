import { Button } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { AuthorInput, ButtonContainer, CreateContainer, DateInput, DescriptionInput, Input, SectorInput, SourceInput, StockName, TitleInput } from "./styles";
import { GET_STOCKS, STOCK_NEWS_CREATE } from "../../utils/Consts";
import axios from "axios";
import { StockType } from "../../common/enum/StockType";


const StockNewsCreate: FC = () => {

const [stockNews, setStockNews] = useState({
    title: "",
    stockName: "",
    sectors: "",
    description: "",
    author: "",
    source: "",
    date: "",
    stocks: [""],
  });

  const [stocks, setStocks] = useState<[StockType]>();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setStockNews({
      ...stockNews,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios.get(GET_STOCKS)
        .then(response => {
            setStocks(response.data);
        });
  },[]);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    axios
      .post(STOCK_NEWS_CREATE, stockNews)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    <CreateContainer>
        <TitleInput>
            <Input placeholder="Add Title"
            type="string"
            name="title"
            value={stockNews.title}
            onChange={handleChange}
             />
        </TitleInput>
        <DescriptionInput>
            <Input placeholder="Add Description"
            type="string"
            name="description"
            value={stockNews.description}
            onChange={handleChange}
             />
        </DescriptionInput>
        <StockName
            name="stocks"
            id="selectList"
            onChange={handleChange}>
                {stocks&&stocks.map((stocks, i)=>{ return (
            <option key={i} value={stocks._id}>{stocks.ticker}</option>                   
                )
                })}
        </StockName>
        <SectorInput>
            <Input placeholder="Add Sector"
            type="string"
            name="sectors"
            value={stockNews.sectors}
            onChange={handleChange}
             />
        </SectorInput>
        <AuthorInput>
            <Input placeholder="Add Author"
            type="string"
            name="author"
            value={stockNews.author}
            onChange={handleChange}
             />
        </AuthorInput>
        <SourceInput>
            <Input placeholder="Add Source"
            type="string"
            name="source"
            value={stockNews.source}
            onChange={handleChange}
             />
        </SourceInput>
        <DateInput>
            <Input placeholder="Add Date"
            type="date"
            name="date"
            value={stockNews.date}
            onChange={handleChange}
             />
        </DateInput>
    </CreateContainer>
    <ButtonContainer>
    <Button onClick={handleSubmit} >Publish</Button>
    </ButtonContainer>
    </>
  );
};

export default StockNewsCreate;