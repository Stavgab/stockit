import { Collection, ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { MongoConnector } from '../mongo/connector';
import { StockNewsDto } from './dto/stockNewsDto';

const STOCK_NEWS_COLLECTION_NAME = 'stock news';

type StockNewsCollection = Collection<StockNewsDto>;

@Injectable()
export class StockNewsDal {
  constructor(private mongoConnector: MongoConnector) {}

  public async getStocksNews(): Promise<StockNewsDto[]> {
    const collection = await this.getStockNewsDbConnection();
    return collection.find().toArray();
  }

  public async createStockNews(news: StockNewsDto): Promise<ObjectId> {
    const collection = await this.getStockNewsDbConnection();
    return (await collection.insertOne(news)).insertedId;
  }

  public async getStockNewsById(id: ObjectId): Promise<StockNewsDto> {
    const collection = await this.getStockNewsDbConnection();
    const query = { _id: id };
    return collection.findOne(query);
  }

  public async deleteStockNewsById(id: ObjectId): Promise<void> {
    const collection = await this.getStockNewsDbConnection();
    const query = { _id: id };
    await collection.deleteOne(query);
  }

  public async updateStockNewsById(
    id: ObjectId,
    stock: StockNewsDto,
  ): Promise<void> {
    const collection = await this.getStockNewsDbConnection();
    const query = { _id: id };
    await collection.findOneAndUpdate(query, { $set: stock });
  }

  private async getStockNewsDbConnection(): Promise<StockNewsCollection> {
    const db = await this.mongoConnector.getDbInstance();
    return db.collection(STOCK_NEWS_COLLECTION_NAME);
  }
}
