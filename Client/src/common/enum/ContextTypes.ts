import { StockProps } from "../../components/LiveSearchResultListItem/LiveSearchResultListItem";

export type LiveSearchContextType = {
  isLiveSearch: Boolean;
  setIsLiveSearch: (isLiveSearch: Boolean) => void;
};

export type LiveSearchResultType = {
  stocks: StockProps[];
  setStocks: (stock: StockProps[]) => void;
};
