import { Sector } from "./SectorType";

export interface StockNewsType {
  _id?: string;
  title: string;
  stockName: string;
  sectors: Sector;
  author: string;
  source: string;
  date: Date;
  stocks?: [""];
}
