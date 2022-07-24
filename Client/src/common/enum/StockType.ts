import { SectorType } from "./SectorType";

export interface StockType {
  ticker: String;
  company: String;
  price: Number;
  marketCap: Number;
  sector: SectorType;
  location?: String;
  stockHistory?: any;
  news?: any;
}
