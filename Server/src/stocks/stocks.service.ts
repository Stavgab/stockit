import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { StocksDal } from './stocks.dal';
import { StockDto } from './dto/stock.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class StocksService {
  constructor(
    private stocksDal: StocksDal,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  public async getStocks(): Promise<StockDto[]> {
    return await this.stocksDal.getStocks();
  }

  public async createStock(stock: StockDto): Promise<void> {
    await this.stocksDal.createStock(stock);
  }

  public async getStockById(id: ObjectId): Promise<StockDto> {
    id = new ObjectId(id);
    return await this.stocksDal.getStockById(id);
  }

  public async deleteStockById(id: ObjectId): Promise<void> {
    id = new ObjectId(id);
    await this.stocksDal.deleteStockById(id);
  }

  public async updateStockById(id: ObjectId, stock: StockDto): Promise<void> {
    id = new ObjectId(id);
    await this.stocksDal.updateStockById(id, stock);
  }
}
