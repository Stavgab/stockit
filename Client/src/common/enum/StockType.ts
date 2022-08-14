import { Sector } from "./SectorType";

export interface StockType {
  _id?:string;
  ticker: String;
  company: String;
  price: Number;
  marketCap: Number;
  sector: Sector;
  location: String;
  stockHistory?: any;
  news?: any;
}
