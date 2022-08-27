import { createContext } from "react";
import {
  LiveSearchContextType,
  LiveSearchResultType,
} from "../common/enum/ContextTypes";

export const LiveSearchContext = createContext<LiveSearchContextType>({
  isLiveSearch: false,
  setIsLiveSearch: () => {},
});

export const SearchStocksContext = createContext<LiveSearchResultType>({
  stocks: [],
  setStocks: () => {},
});
