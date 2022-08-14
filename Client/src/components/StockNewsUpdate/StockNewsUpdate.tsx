import { Button } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { AuthorInput, ButtonContainer, CreateContainer, DateInput, DescriptionInput, Input, SourceInput, TitleInput } from "./styles";
import { useNavigate } from "react-router-dom";
import { SERVER_URL, STOCK_ROUTE } from "../../utils/Consts";
import axios from "axios";
import { SectorType } from "../../common/enum/SectorType";

export interface StockProps {
    _id?: string;
    ticker: String;
    company: String;
    price: Number;
    marketCap: Number;
    sector: SectorType;
  }

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



const navigate = useNavigate();
  return (
    <>
    <CreateContainer>
        <TitleInput>
            <Input placeholder="Add Title" />
        </TitleInput>
        <DescriptionInput>
            <Input placeholder="Add Description" />
        </DescriptionInput>
        <AuthorInput>
            <Input placeholder="Add Author" />
        </AuthorInput>
        <SourceInput>
            <Input placeholder="Add Source" />
        </SourceInput>
        <DateInput>
            <Input placeholder="Add Date" />
        </DateInput>
    </CreateContainer>
    <ButtonContainer>
    <Button onClick={() => navigate(`${SERVER_URL}`)} >Publish</Button>
    </ButtonContainer>
    </>
  );
};

export default StockNewsCreate;