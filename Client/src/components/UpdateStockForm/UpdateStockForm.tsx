import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonInput from "../../common/CommonInput/CommonInput";
import { InputContainer } from "../../common/CommonInput/styles";
import { Sector, SectorArray } from "../../common/enum/SectorType";
import { StockType } from "../../common/enum/StockType";
import { CommonButton } from "../../common/styles";
import { SERVER_URL, STOCK_ROUTE } from "../../utils/Consts";
import { ButtonColors } from "../../utils/Palette";
import {
  ErrorMessage,
  ErrorMessageContainer,
  Form,
  ReloadButton,
  SelectionMenu,
  SubmitButton,
  Title,
} from "./styles";

interface Props {
  id: String;
}
const UpdateStockForm: FC<Props> = ({ id }) => {
  const [stock, setStock] = useState<StockType>({
    ticker: "",
    company: "",
    price: 0,
    marketCap: 0,
    sector: Sector.UNCLASSIFIED,
    location: "",
  });
  const [sector, setSector] = useState<Number>(0);
  const [isError, setIsError] = useState<Boolean>(false);
  const [isReSelected, setIsReSelected] = useState<Boolean>(false);

  const navigate = useNavigate();

  const reloadPage = () => {
    setIsError(false);
    navigate(0);
  };

  const removeIdFromStock = () => {
    setStock((current) => {
      const { _id, ...rest } = current;
      return rest;
    });
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .put(`${SERVER_URL}${STOCK_ROUTE}update/${id}`, stock)
      .then((res) => {
        setIsError(false);
        navigate("/");
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      });
  };
  const handleChange = (e: any) => {
    if (e.target.name === "sector") {
      setSector(e.target.value);
      setIsReSelected(true);
    }
    setStock({
      ...stock,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    axios
      .get(`${SERVER_URL}${STOCK_ROUTE}details/${id}`)
      .then((res) => {
        setStock(res.data);
        setIsError(false);
        removeIdFromStock();
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }, [id]);

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
          <Title>Edit Stock - {stock.company}</Title>
          <Form onSubmit={handleSubmit}>
            <CommonInput
              label="Ticker"
              onChange={handleChange}
              type="text"
              name="ticker"
              value={stock.ticker}
            />
            <CommonInput
              label="Company"
              onChange={handleChange}
              type="text"
              name="company"
              value={stock.company}
            />
            <CommonInput
              label="Price"
              onChange={handleChange}
              type="number"
              name="price"
              value={stock.price}
            />
            <CommonInput
              label="MarketCap"
              onChange={handleChange}
              type="number"
              name="marketCap"
              value={stock.marketCap}
            />
            <InputContainer>
              <label>Choose Sector</label>
              <SelectionMenu
                onChange={handleChange}
                value={isReSelected ? sector.toString() : stock?.sector}
                name="sector"
              >
                {SectorArray.map((value, index) => {
                  if (index >= 0)
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                })}
              </SelectionMenu>
            </InputContainer>
            <CommonInput
              label="Location"
              onChange={handleChange}
              type="text"
              name="location"
              value={stock.location}
            />
            <CommonButton
              opposite={false}
              color={ButtonColors.BLUE}
              type="submit"
            >
              Save Changes
            </CommonButton>
          </Form>
        </>
      )}
    </>
  );
};

export default UpdateStockForm;
