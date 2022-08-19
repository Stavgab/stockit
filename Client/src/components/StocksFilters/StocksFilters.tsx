import React, { FC, useEffect, useState } from "react";
import { Sector, SectorArray } from "../../common/enum/SectorType";
import { MarketCapRanges, PriceRanges } from "../../utils/Consts";
import StocksList from "../StocksList/StocksList";
import { StockProps } from "../StocksListItem/StocksListItem";
import { FiltersContainer, Select } from "./styles";

interface Props {
  stocks: StockProps[];
}
const StocksFilters: FC<Props> = ({ stocks }) => {
  const [selection, setSelection] = useState<StockProps[]>();

  const [sectorValue, setSectorValue] = useState<string>("default");
  const [priceValue, setPriceValue] = useState<string>("default");
  const [marketCap, setMarketCap] = useState<string>("default");

  const handleChange = (e: any) => {
    if (e.target.name === "price") filterByPrice(e.target.value);
    if (e.target.name === "sector") filterBySector(e.target.value);
    if (e.target.name === "marketCap") filterByMarketCap(e.target.value);
    if (e.target.value === "default") onClear();
  };

  const onClear = () => {
    setSelection(stocks);
    setSectorValue("default");
    setPriceValue("default");
    setMarketCap("default");
  };
  const filterBySector = (sector: Sector) => {
    const filteredStocks = stocks!.filter((stock) => {
      setSectorValue(sector.toString());
      return stock.sector == sector;
    });
    setSelection(filteredStocks);
    setPriceValue("default");
    setMarketCap("default");
  };
  const filterByPrice = (price: number) => {
    const filteredStocks = stocks?.filter((stock) => {
      setPriceValue(price.toString());
      if (price == 0 && stock.price < 10) {
        return stock.price;
      } else if (price == 1 && stock.price >= 10 && stock.price <= 100)
        return stock.price;
      else if (price == 2 && stock.price > 100) return stock.price;
      return stock.price === price;
    });
    setSelection(filteredStocks);
    setSectorValue("default");
    setMarketCap("default");
  };
  const filterByMarketCap = (marketCap: Number) => {
    setMarketCap(marketCap.toString());
    const filteredStocks = stocks?.filter((stock) => {
      if (marketCap == 0 && stock.marketCap < 10) {
        return stock.marketCap;
      } else if (
        marketCap == 1 &&
        stock.marketCap >= 10 &&
        stock.marketCap <= 100
      )
        return stock.marketCap;
      else if (marketCap == 2 && stock.marketCap > 100) return stock.marketCap;
    });
    setSelection(filteredStocks);
    setSectorValue("default");
    setPriceValue("default");
  };

  useEffect(() => {
    setSelection(stocks);
  }, [stocks]);

  return (
    <>
      <FiltersContainer>
        <p>Filters</p>
        <Select value={sectorValue} onChange={handleChange} name="sector">
          <option aria-disabled value="default">
            Filter by Sector
          </option>
          {SectorArray.map((value, index) => {
            if (index >= 0)
              return (
                <option value={value} key={index}>
                  {value}
                </option>
              );
          })}
        </Select>
        <Select value={priceValue} onChange={handleChange} name="price">
          <option aria-disabled value="default">
            Filter by Price
          </option>
          {PriceRanges.map((price, i) => {
            return (
              <option value={i} key={i}>
                {price}
              </option>
            );
          })}
        </Select>
        <Select value={marketCap} onChange={handleChange} name="marketCap">
          <option aria-disabled value="default">
            Filter by MarketCap.
          </option>
          {MarketCapRanges.map((marketCap, i) => {
            return (
              <option value={i} key={i}>
                {marketCap}
              </option>
            );
          })}
        </Select>
        <button onClick={onClear}>Clear all</button>
      </FiltersContainer>
      <StocksList stocks={selection!} />
    </>
  );
};

export default StocksFilters;
