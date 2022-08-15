import { Button } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { AuthorInput, ButtonContainer, CreateContainer, DateInput, DescriptionInput, Input, SourceInput, TitleInput } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../../utils/Consts";
import axios from "axios";
  
const StockNewsCreate: FC = () => {
    const {id} = useParams();
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

    useEffect(() => {
        console.log(id);
        axios.get(`${SERVER_URL}news/${id}`)
            .then(response => {
                setStockNews(response.data);
            });
      },[]);

      const handleChange = (e: any) => {
        setStockNews({
            ...stockNews,
            [e.target.name]: e.target.value,
          });
      };
    
      const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        axios
          .post(`${SERVER_URL}news/${id}/update`, stockNews)
          .then((res) => {
            navigate("/");
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
                <Input placeholder="Add Title"
                name="title"
                onChange={handleChange}
                type="string"
                value={stockNews.title}
                />
            </TitleInput>
            <DescriptionInput>
                <Input placeholder="Add Description" 
                name="description"
                onChange={handleChange}
                type="string"
                value={stockNews.description}
                />
            </DescriptionInput>
            <AuthorInput>
                <Input placeholder="Add Author" 
                name="author"
                onChange={handleChange}
                type="string"
                value={stockNews.author}
                />
            </AuthorInput>
            <SourceInput>
                <Input placeholder="Add Source" 
                name="source"
                onChange={handleChange}
                type="string"
                value={stockNews.source}
                />
            </SourceInput>
            <DateInput>
                <Input placeholder="Add Date" 
                name="date"
                onChange={handleChange}
                type="string"
                value={stockNews.date}
                />
            </DateInput>
        </CreateContainer>
        <ButtonContainer>
        <Button onClick={handleSubmit} >UPDATE</Button>
        </ButtonContainer>
        </>
    );
    };

export default StockNewsCreate;