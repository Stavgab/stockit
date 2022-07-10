import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { StocksDal } from './stocks.dal';
import { StockDto } from './dto/stock.dto';

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
}
