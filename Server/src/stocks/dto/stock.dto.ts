import { ObjectId } from 'mongodb';
import { Sector } from '../enum/sector';

export interface StockDto {
  _id?: ObjectId;
  ticker: string;
  company: string;
  price: number;
  marketCap: number;
  sector: Sector;
  location: string;
  isLiveUpdate: boolean;
  stockHistory: ObjectId;
  stockNews: ObjectId[];
}
