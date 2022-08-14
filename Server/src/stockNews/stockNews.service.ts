import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { StockNewsDal } from './stockNews.dal';
import { StockNewsDto } from './dto/stockNewsDto';
import { ObjectId } from 'mongodb';
import { StocksService } from '../stocks/stocks.service';
import { BrowserContext } from 'puppeteer';
import { InjectContext } from 'nest-puppeteer';

@Injectable()
export class StockNewsService {
  constructor(
    @InjectContext()
    private readonly browser: BrowserContext,
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
    const news = await this.getStockNewsById(id);
    await this.stocksService.removeStockNewsFromStocks(id, news.stocks);
    await this.stockNewsDal.deleteStockNewsById(id);
  }

  public async updateStockNewsById(
    id: ObjectId,
    stock: StockNewsDto,
  ): Promise<void> {
    id = new ObjectId(id);
    await this.stockNewsDal.updateStockNewsById(id, stock);
  }

  // public async scrapNews(): Promise<void> {
  //   const page = await this.browser.newPage();
  //   await page.goto('https://www.macrotrends.net/stocks/stock-screener');
  //   const data = (await page.content())
  //     .split('var originalData = ')[1]
  //     .split('var filterArray = ')[0]
  //     .replace('[{', '')
  //     .replace('}]', '')
  //     .replace('"', '')
  //     .split('},{');
  //   data.forEach((stock) => JSON.parse('{' + stock + '}'));
  // }
}
