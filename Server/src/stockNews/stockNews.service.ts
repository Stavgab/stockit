import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { StockNewsDal } from './stockNews.dal';
import { StockNewsDto } from './dto/stockNewsDto';
import { ObjectId } from 'mongodb';
import { StocksService } from '../stocks/stocks.service';

@Injectable()
export class StockNewsService {
  constructor(
    private stocksService: StocksService,
    private stockNewsDal: StockNewsDal,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  public async getStocksNews(): Promise<StockNewsDto[]> {
    return await this.stockNewsDal.getStocksNews();
  }

  public async createStockNews(news: StockNewsDto): Promise<void> {
    const newsId = await this.stockNewsDal.createStockNews(news);
    await this.stocksService.addStockNewsToStocks(newsId, news.stocks);
  }

  public async getStockNewsById(id: ObjectId): Promise<StockNewsDto> {
    id = new ObjectId(id);
    return await this.stockNewsDal.getStockNewsById(id);
  }

  public async deleteStockNewsById(id: ObjectId): Promise<void> {
    id = new ObjectId(id);
    await this.stockNewsDal.deleteStockNewsById(id);
  }

  public async updateStockNewsById(
    id: ObjectId,
    stock: StockNewsDto,
  ): Promise<void> {
    id = new ObjectId(id);
    await this.stockNewsDal.updateStockNewsById(id, stock);
  }
}