import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonInput from "../../common/CommonInput/CommonInput";
import { InputContainer } from "../../common/CommonInput/styles";
import { SERVER_URL, STOCK_ROUTE } from "../../utils/Consts";
import {
  ErrorMessage,
  ErrorMessageContainer,
  Form,
  ReloadButton,
  SelectionMenu,
  SubmitButton,
  Title,
} from "./styles";

const CreateStockForm = () => {
  const [newStock, setNewStock] = useState<any>({
    ticker: "",
    company: "",
    price: "",
    marketCap: "",
    sector: 0,
    location: "",
  });
  const [sector, setSector] = useState<Number>(0);
  const [isError, setIsError] = useState<Boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    if (e.target.name === "sector") setSector(e.target.value);
    setNewStock({
      ...newStock,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .post(`${SERVER_URL}${STOCK_ROUTE}`, newStock)
      .then((res) => {
        setIsError(false);
        navigate("/");
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      });
  };

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
          <Title>Add New Stock</Title>
          <Form onSubmit={handleSubmit}>
            <CommonInput
              label="Ticker"
              onChange={handleChange}
              type="text"
              name="ticker"
            />
            <CommonInput
              label="Company"
              onChange={handleChange}
              type="text"
              name="company"
            />
            <CommonInput
              label="Price"
              onChange={handleChange}
              type="number"
              name="price"
            />
            <CommonInput
              label="MarketCap"
              onChange={handleChange}
              type="number"
              name="marketCap"
            />
            <InputContainer>
              <label>Choose Sector</label>
              <SelectionMenu
                onChange={handleChange}
                value={sector.toString()}
                name="sector"
              >
                <option value={0}>Technology</option>
                <option value={1}>Healthcare</option>
                <option value={2}>Financial</option>
                <option value={3}>Industrials</option>
              </SelectionMenu>
            </InputContainer>
            <CommonInput
              label="Location"
              onChange={handleChange}
              type="text"
              name="location"
            />
            <SubmitButton type="submit">Add</SubmitButton>
          </Form>
        </>
      )}
    </>
  );
};

export default CreateStockForm;
