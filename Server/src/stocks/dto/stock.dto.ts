import { ObjectId } from 'mongodb';
import { Sector } from '../enum/sector';

export interface StockDto {
  ticker: string;
  company: string;
  price: number;
  marketCap: number;
  sector: Sector;
  location: string;
  stockHistory: ObjectId;
  stockNews: ObjectId[];
}
