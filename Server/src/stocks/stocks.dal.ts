import { Collection, ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { MongoConnector } from '../mongo/connector';
import { StockDto } from './dto/stock.dto';

const STOCKS_COLLECTION_NAME = 'stocks';

type StocksCollection = Collection<StockDto>;

@Injectable()
export class StocksDal {
  constructor(private mongoConnector: MongoConnector) {}

  public async getStocks(): Promise<StockDto[]> {
    const collection = await this.getStocksDbConnection();
    return collection.find().toArray();
  }

  public async createStock(stock: StockDto): Promise<void> {
    const collection = await this.getStocksDbConnection();
    await collection.insertOne(stock);
  }

  public async getStockById(id: ObjectId): Promise<StockDto> {
    const collection = await this.getStocksDbConnection();
    const query = { _id: id };
    return collection.findOne(query);
  }

  public async deleteStockById(id: ObjectId): Promise<void> {
    const collection = await this.getStocksDbConnection();
    const query = { _id: id };
    await collection.deleteOne(query);
  }

  public async updateStockById(id: ObjectId, stock: StockDto): Promise<void> {
    const collection = await this.getStocksDbConnection();
    const query = { _id: id };
    await collection.findOneAndUpdate(query, { $set: stock });
  }

  private async getStocksDbConnection(): Promise<StocksCollection> {
    const db = await this.mongoConnector.getDbInstance();
    return db.collection(STOCKS_COLLECTION_NAME);
  }
}
