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

  public async getStockByTicker(ticker: string): Promise<StockDto> {
    const collection = await this.getStocksDbConnection();
    const query = { ticker: ticker };
    return collection.findOne(query);
  }

  public async getStocksByLiveSearch(text: string): Promise<StockDto[]> {
    const collection = await this.getStocksDbConnection();
    const regex = new RegExp(text, 'i')
    const query = { ticker: {$regex: regex} };
    return collection.find(query).toArray();
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

  public async addStockNewsToStock(
    newsId: ObjectId,
    stockId: ObjectId,
  ): Promise<void> {
    const collection = await this.getStocksDbConnection();
    const query = { _id: stockId };
    await collection.findOneAndUpdate(query, {
      $addToSet: { stockNews: newsId },
    });
  }

  public async removeStockNewsFromStocks(
    newsId: ObjectId,
    stockId: ObjectId,
  ): Promise<void> {
    const collection = await this.getStocksDbConnection();
    const query = { _id: stockId };
    await collection.findOneAndUpdate(query, {
      $pull: { stockNews: newsId },
    });
  }

  async getSectorsMarketCap() {
    const collection = await this.getStocksDbConnection();
    const pipeline = [
      {
        $group: {
          _id: '$sector',
          marketCap: { $sum: '$marketCap' },
          marketCapAvg: { $avg: '$marketCap' },
        },
      },
    ];
    return await collection.aggregate(pipeline).toArray();
  }

  private async getStocksDbConnection(): Promise<StocksCollection> {
    const db = await this.mongoConnector.getDbInstance();
    return db.collection(STOCKS_COLLECTION_NAME);
  }
}
