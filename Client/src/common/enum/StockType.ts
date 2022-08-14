import { SectorType } from "./SectorType";

export interface StockType {
  _id?:string;
  ticker: String;
  company: String;
  price: Number;
  marketCap: Number;
  sector: SectorType;
  location?: String;
  stockHistory?: any;
  news?: any;
}
