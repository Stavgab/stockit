import axios from "axios";
import Lottie from "lottie-react";
import React, { useContext, useEffect, useState } from "react";
import { useMountTransition } from "../../common/hooks/useMountTransition";
import LiveSearchBox from "../../components/LiveSearchBox/LiveSearchBox";
import LiveSearchResultList from "../../components/LiveSearchResultList/LiveSearchResultList";
import { StockProps } from "../../components/LiveSearchResultListItem/LiveSearchResultListItem";
import { LiveSearchContext, SearchStocksContext } from "../../context/Context";
import { SERVER_URL, STOCK_ROUTE } from "../../utils/Consts";
import { LiveSerchBackground, PopupContainer } from "./styles";
import Loader from "../../utils/img/loader.json";

const LiveSearch = () => {
  const [stocks, setStocks] = useState<StockProps[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const { isLiveSearch } = useContext(LiveSearchContext);
  const hasTransitionedIn = useMountTransition(isLiveSearch, 1000);

  const handleChange = (e: any) => {
    setIsLoading(true);
    axios
      .get(`${SERVER_URL}${STOCK_ROUTE}livesearch/${e.target.value}`)
      .then((res) => {
        setStocks(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log("Error while loading data from server");
        setIsLoading(false);
      });
  };

  return (
    <>
      {(isLiveSearch || hasTransitionedIn) && (
        <SearchStocksContext.Provider value={{ stocks, setStocks }}>
          <LiveSerchBackground isVisible={hasTransitionedIn}>
            <PopupContainer isVisible={hasTransitionedIn}>
              <LiveSearchBox onChange={handleChange} />
              {stocks.length > 0 ? (
                <LiveSearchResultList stocks={stocks} />
              ) : (
                ""
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
