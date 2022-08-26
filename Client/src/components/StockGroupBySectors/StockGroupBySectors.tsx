import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { SERVER_URL, STOCK_ROUTE } from "../../utils/Consts";
import { Body, Container, Header, SectorTable, Td, Th, Title, Tr } from "./styles";

const StockGroupBySectors: FC=() => {
    

const [sectors, setStockBySector] = useState([{
    sector: "",
    marketCap: "",
    marketCapAvg: "", 
  }]);
  

useEffect(() => {
    axios
      .get(`${SERVER_URL}${STOCK_ROUTE}sectors`)
      .then((res) => {
        setStockBySector(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Container>
    <Title>Sectors By Market Cap</Title>
      <SectorTable>
        <Header>
          <Tr>
            <Th>Sector</Th>
            <Th>Market Cap $</Th>
            <Th>Market Cap AVG $</Th>
          </Tr>
        </Header>
        <Body>
          {sectors &&
            sectors.map((sector, index) => {
                    let normalizedMarketCap;
                    if (Number(sector.marketCap) / 1000000000000 > 1)
                            normalizedMarketCap = "$" + Number(Number(sector.marketCap).toFixed(4)) / 1000000000000 + "T";
                    else if (Number(sector.marketCap) / 1000000000 > 1)
                            normalizedMarketCap = "$" + Number(Number(sector.marketCap).toFixed(4)) / 1000000000 + "B";
                    else if (Number(sector.marketCap) / 1000000 > 1)
                            normalizedMarketCap = "$" + Number(Number(sector.marketCap).toFixed(4)) / 1000000 + "M";
                    let normalizedMarketCapAvg;
                    if (Number(sector.marketCapAvg) / 1000000000000 > 1)
                            normalizedMarketCapAvg = "$" + Number(Number(sector.marketCapAvg).toFixed(4)) / 1000000000000 + "T";
                    else if (Number(sector.marketCapAvg) / 1000000000 > 1)
                            normalizedMarketCapAvg = "$" + Number(Number(sector.marketCapAvg).toFixed(4)) / 1000000000 + "B";
                    else if (Number(sector.marketCapAvg) / 1000000 > 1)
                            normalizedMarketCapAvg = "$" + Number(Number(sector.marketCapAvg).toFixed(4)) / 1000000 + "M";
                return (
                    <Tr>
                      <Td>{sector.sector}</Td>
                      <Td>{normalizedMarketCap}</Td>
                      <Td>{normalizedMarketCapAvg}</Td>
                    </Tr>
                  );
            })}
        </Body>
      </SectorTable>
    </Container>
  );
};

export default StockGroupBySectors;