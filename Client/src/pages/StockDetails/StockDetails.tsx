import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StockType } from "../../common/enum/StockType";
import { CommonCenteredContainer } from "../../common/styles";
import {
  ErrorMessage,
  ErrorMessageContainer,
} from "../../components/CreateStockForm/styles";
import StockGraph from "../../components/StockGraph/StockGraph";
import StockView from "../../components/StockView/StockView";
import { SERVER_URL, STOCK_ROUTE } from "../../utils/Consts";
import {
  ContentContainer,
  DeleteStockButton,
  EditStockButton,
  GraphContainer,
  Head,
  Title,
} from "./styles";

const StockDetails: FC = () => {
  const data = [
    { x: 1, y: 90 },
    { x: 2, y: 12 },
    { x: 3, y: 34 },
    { x: 4, y: 53 },
    { x: 5, y: 52 },
    { x: 6, y: 9 },
    { x: 7, y: 18 },
    { x: 8, y: 78 },
    { x: 9, y: 28 },
    { x: 10, y: 34 },
    { x: 40, y: 40 },
    { x: 41, y: 100 },
  ];

  const { id } = useParams();
  const navigate = useNavigate();
  const [stock, setStock] = useState<StockType>();
  const [err, setErr] = useState<Boolean>(false);
  useEffect(() => {
    axios
      .get(`${SERVER_URL}${STOCK_ROUTE}details/${id}`)
      .then((res) => {
        if (res.data !== undefined) setStock(res.data);
        setErr(false);
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
      });
  }, []);
  return err ? (
    <ErrorMessageContainer>
      <ErrorMessage>Error while loading data...</ErrorMessage>
      <ErrorMessage style={{ fontSize: 20 }}>
        please refresh the page
      </ErrorMessage>
    </ErrorMessageContainer>
  ) : (
    <CommonCenteredContainer>
      <Title>TSLA (Tesla Inc.)</Title>
      <Head>
        <DeleteStockButton
          onClick={() => {
            navigate(`/${STOCK_ROUTE}delete/${id}`);
          }}
        >
          Delete Stock
        </DeleteStockButton>
        <EditStockButton
          onClick={() => {
            navigate(`/${STOCK_ROUTE}edit/${id}`);
          }}
        >
          Edit Stock
        </EditStockButton>
      </Head>
      {stock && (
        <StockView
          ticker={stock.ticker}
          company={stock.company}
          price={stock.price}
          marketCap={stock.marketCap}
          sector={stock.sector}
          location={stock.location}
        />
      )}
      <ContentContainer>
        <GraphContainer>
          <StockGraph width={800} height={450} data={data} />
        </GraphContainer>

        <iframe
          width="400"
          height="420"
          id="gmap_canvas"
          src={`https://maps.google.com/maps?q=${stock?.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
        ></iframe>
      </ContentContainer>
    </CommonCenteredContainer>
  );
};

export default StockDetails;
