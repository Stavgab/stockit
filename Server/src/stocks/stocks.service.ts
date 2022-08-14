import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { StocksDal } from './stocks.dal';
import { StockDto } from './dto/stock.dto';
import { ObjectId } from 'mongodb';
import { BrowserContext } from 'puppeteer';
import { InjectContext } from 'nest-puppeteer';

@Injectable()
export class StocksService {
  constructor(
    @InjectContext()
    private readonly browser: BrowserContext,
    private stocksDal: StocksDal,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  public async getStocks(): Promise<StockDto[]> {
    return await this.stocksDal.getStocks();
  }

  public async createStock(stock: StockDto): Promise<void> {
    stock.marketCap = Number(stock.marketCap);
    stock.price = Number(stock.price);
    const isAlreadyExist = await this.getStockByTicker(stock.ticker);
    if (isAlreadyExist)
      await this.stocksDal.updateStockById(isAlreadyExist._id, stock);
    else await this.stocksDal.createStock(stock);
  }

  public async getStockById(id: ObjectId): Promise<StockDto> {
    id = new ObjectId(id);
    return await this.stocksDal.getStockById(id);
  }

  public async getStockByTicker(ticker: string): Promise<StockDto> {
    return await this.stocksDal.getStockByTicker(ticker);
  }

  public async deleteStockById(id: ObjectId): Promise<void> {
    id = new ObjectId(id);
    await this.stocksDal.deleteStockById(id);
  }

  public async updateStockById(id: ObjectId, stock: StockDto): Promise<void> {
    id = new ObjectId(id);
    await this.stocksDal.updateStockById(id, stock);
  }

  public async addStockNewsToStocks(
    newsId: ObjectId,
    stocksId: ObjectId[],
  ): Promise<void> {
    newsId = new ObjectId(newsId);
    stocksId.forEach((stockId) =>
      this.stocksDal.addStockNewsToStock(newsId, new ObjectId(stockId)),
    );
  }

  public async removeStockNewsFromStocks(
    newsId: ObjectId,
    stocksId: ObjectId[],
  ): Promise<void> {
    newsId = new ObjectId(newsId);
    stocksId.forEach((stockId) =>
      this.stocksDal.removeStockNewsFromStocks(newsId, new ObjectId(stockId)),
    );
  }

  public async scrapStocks(): Promise<void> {
    const page = await this.browser.newPage();
    await page.goto('https://www.macrotrends.net/stocks/stock-screener');
    const data = (await page.content())
      .split('var originalData = ')[1]
      .split('var filterArray = ')[0]
      .replace('[{', '')
      .replace('}]', '')
      .split('},{');
    for (const stock of data) {
      await this.createStock(
        await this.mapScrapToStock(JSON.parse('{' + stock + '}')),
      );
    }
  }

  private async mapScrapToStock(JSON): Promise<StockDto> {
    return {
      ticker: JSON.ticker,
      company: JSON.comp_name_2,
      location: JSON.country_code,
      marketCap: Number(JSON.market_val),
      price: Number(JSON.last_close),
      sector: JSON.zacks_x_sector_desc,
      stockHistory: undefined,
      stockNews: [],
    };
  }
}
