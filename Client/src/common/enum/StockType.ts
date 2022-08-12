import { Sector } from "./SectorType";

export interface StockType {
  ticker: String;
  company: String;
  price: Number;
  marketCap: Number;
  sector: Sector;
  location?: String;
  stockHistory?: any;
  news?: any;
}
