import axios from "axios";
import Lottie from "lottie-react";
import React, { useContext, useEffect, useState } from "react";
import { useMountTransition } from "../../common/hooks/useMountTransition";
import LiveSearchBox from "../../components/LiveSearchBox/LiveSearchBox";
import LiveSearchResultList from "../../components/LiveSearchResultList/LiveSearchResultList";
import { StockProps } from "../../components/LiveSearchResultListItem/LiveSearchResultListItem";
import { LiveSearchContext, SearchStocksContext } from "../../context/Context";
import { NEWS_ROUTE, SERVER_URL, STOCK_ROUTE } from "../../utils/Consts";
import { LiveSerchBackground, PopupContainer } from "./styles";
import Loader from "../../utils/img/loader.json";
import { StockNewsProps } from "../../components/StockNewsListItem/StockNewsListItem";
import StockNewsList from "../../components/StockNewsList/StockNewsList";

const LiveSearch = () => {
  const [stocks, setStocks] = useState<StockProps[]>([]);
  const [stockNews, setStockNews] = useState<StockNewsProps[]>([]);
  const [isNews, setIsNews] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const { isLiveSearch } = useContext(LiveSearchContext);
  const hasTransitionedIn = useMountTransition(isLiveSearch, 1000);

  const handleChange = (e: any) => {
    setIsLoading(true);
    setInputValue(e.target.value);
    axios
      .get(
        `${SERVER_URL}${isNews ? NEWS_ROUTE : STOCK_ROUTE}livesearch/${
          e.target.value
        }`
      )
      .then((res) => {
        isNews ? setStockNews(res.data) : setStocks(res.data);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((e) => {
        console.log("Error while loading data from server");
        setIsLoading(false);
      });
  };

  const onClear = () => {
    isNews ? setStockNews([]) : setStocks([]);
    setInputValue("");
  };
  return (
    <>
      {(isLiveSearch || hasTransitionedIn) && (
        <SearchStocksContext.Provider
          value={{ stocks, setStocks, isNews, setIsNews }}
        >
          <LiveSerchBackground isVisible={hasTransitionedIn}>
            <PopupContainer isVisible={hasTransitionedIn}>
              <LiveSearchBox
                onChange={handleChange}
                inputValue={inputValue}
                onClear={onClear}
              />
              {isNews && stockNews.length > 0 ? (
                <StockNewsList stockNews={stockNews} isShow={false} />
              ) : isNews === false && stocks.length > 0 ? (
                <LiveSearchResultList stocks={stocks} />
              ) : (
                "try to search something..."
              )}
              {isLoading && (
                <Lottie
                  animationData={Loader}
                  style={{ height: 100, width: 200 }}
                />
              )}
            </PopupContainer>
          </LiveSerchBackground>
        </SearchStocksContext.Provider>
      )}
    </>
  );
};

export default LiveSearch;
