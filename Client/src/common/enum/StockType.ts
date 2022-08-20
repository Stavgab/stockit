import { Sector } from "./SectorType";

export interface StockType {
  _id?: string;
  ticker: string;
  company: String;
  price: Number;
  marketCap: number;
  sector: Sector;
  location: String;
  stockHistory?: any;
  news?: any;
}
