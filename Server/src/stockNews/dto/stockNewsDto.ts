import { ObjectId } from 'mongodb';
import { Sector } from '../../stocks/enum/sector';

export interface StockNewsDto {
  stocks: ObjectId;
  title: string;
  author: string;
  source: string;
  sectors: Sector;
  date: Date;
}
