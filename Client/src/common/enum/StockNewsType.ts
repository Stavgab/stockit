import { Sector } from "./SectorType";

export interface StockNewsType {
  _id?: string;
  title: string;
  stockName: string;
  sectors: Sector;
  description: string;
  author: string;
  source: string;
  date: string;
  stocks?: [""];
}
