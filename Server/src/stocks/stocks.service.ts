import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { StocksDal } from './stocks.dal';
import { StockDto } from './dto/stock.dto';
import { ObjectId } from 'mongodb';
import { BrowserContext } from 'puppeteer';
import { InjectContext } from 'nest-puppeteer';
import { randomInt } from 'crypto';
import * as fs from 'fs';

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
    for (let i = 0; i < 10; i++) {
      await this.createStock(
        await this.mapScrapToStock(
          JSON.parse('{' + data[randomInt(data.length) - 1] + '}'),
        ),
      );
    }
  }

  public async scrapStockByTicker(ticker: string): Promise<StockDto> {
    const page = await this.browser.newPage();
    await page.goto('https://finance.yahoo.com/quote/' + ticker);
    const stockName = (
      await page.$$eval(
        'div > #quote-header-info > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > h1',
        (test) => test.map((t) => t.textContent),
      )
    )[0]
      .split('(')[0]
      .trim();
    const marketCap = (
      await page.$$eval(
        'div > #quote-summary > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2)',
        (test) => test.map((t) => t.textContent),
      )
    )[0];
    const stockPrice = (
      await page.$$eval(
        'div > #quote-header-info > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > fin-streamer:nth-child(1)',
        (test) => test.map((t) => t.textContent),
      )
    )[0];
    let marketCapValue;
    switch (marketCap.charAt(marketCap.length - 1)) {
      case 'T': {
        marketCapValue = Number(marketCap.replace('T', '')) * 1000000000000;
        break;
      }
      case 'B': {
        marketCapValue = Number(marketCap.replace('B', '')) * 1000000000;
        break;
      }
      case 'M': {
        marketCapValue = Number(marketCap.replace('M', '')) * 1000000;
        break;
      }
    }
    return {
      _id: undefined,
      company: stockName,
      location: '',
      marketCap: marketCapValue,
      price: Number(stockPrice),
      sector: undefined,
      stockHistory: undefined,
      stockNews: [],
      ticker: ticker,
    };
  }

  private async yfinancemap(scrap: string): Promise<void> {
    fs.writeFileSync('../test.txt', scrap);
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
