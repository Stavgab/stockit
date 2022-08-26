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
import { io } from "socket.io-client";

const StockDetails: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stock, setStock] = useState<StockType>();
  const [err, setErr] = useState<Boolean>(false);
  const [isSet, setIsSet] = useState<Boolean>(false);

  const socket = io(SERVER_URL);
  useEffect(() => {
    axios
      .get(`${SERVER_URL}${STOCK_ROUTE}details/${id}`)
      .then((res) => {
        if (res.data !== undefined) setStock(res.data);
        setErr(false);
        setIsSet(true);
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
        setIsSet(false);
      });
  }, []);
  // Message sent to server
  useEffect(() => {
    if (stock?.ticker !== undefined) {
      console.log("test:" + stock.ticker);
      socket.emit("listLiveUpdate", { ticker: stock.ticker });
    }
  }, [isSet]);
  // Message from server received
  socket.on("liveUpdate" + stock?.ticker, (data) => {
    setStock(data);
    console.log(data);
  });
  return err ? (
    <ErrorMessageContainer>
      <ErrorMessage>Error while loading data...</ErrorMessage>
      <ErrorMessage style={{ fontSize: 20 }}>
        please refresh the page
      </ErrorMessage>
    </ErrorMessageContainer>
  ) : (
    <CommonCenteredContainer>
      <Title>{stock && stock.ticker + "(" + stock.company + ")"}</Title>
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
          {stock && (
            <StockGraph width={800} height={450} ticker={stock.ticker} />
          )}
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
