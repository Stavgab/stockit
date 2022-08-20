import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { StocksDal } from './stocks.dal';
import { StockDto } from './dto/stock.dto';
import { ObjectId } from 'mongodb';
import { BrowserContext } from 'puppeteer';
import { InjectContext } from 'nest-puppeteer';
import { Sector } from './enum/sector';
import yahooFinance from 'yahoo-finance2';
import { HistoryGraphDto } from './dto/history-graph.dto';
import { HistoryRequestDto } from './dto/history-request.dto';
import { SectorsMarketCapDto } from './dto/sectors-market-cap.dto';

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
    stocksId: ObjectId,
  ): Promise<void> {
    newsId = new ObjectId(newsId);
    this.stocksDal.addStockNewsToStock(newsId, new ObjectId(stocksId));
  }

  public async removeStockNewsFromStocks(
    newsId: ObjectId,
    stocksId: ObjectId,
  ): Promise<void> {
    newsId = new ObjectId(newsId);
    this.stocksDal.removeStockNewsFromStocks(newsId, new ObjectId(stocksId));
  }

  public async scrapStockByTicker(ticker: string): Promise<void> {
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
    await page.goto('https://finance.yahoo.com/quote/' + ticker + '/profile');
    const stockLocationExtended = (
      await page.$$eval(
        'div > #Col1-0-Profile-Proxy > section > div > div > div > p:nth-child(1)',
        (test) => test.map((t) => t.innerHTML),
      )
    )[0].split('<br>');
    const stockLocation = stockLocationExtended
      .slice(0, stockLocationExtended.length - 2)
      .toString();
    const stockSector = (
      await page.$$eval(
        'div > #Col1-0-Profile-Proxy > section > div > div > div > p:nth-child(2)',
        (test) => test.map((t) => t.innerHTML),
      )
    )[0]
      .split('<br>')[0]
      .split('<')[3]
      .split('>')[1];
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
    await this.createStock({
      _id: undefined,
      ticker: ticker,
      company: stockName,
      price: Number(stockPrice),
      marketCap: marketCapValue,
      location: stockLocation,
      sector: Sector[stockSector.toUpperCase().replace(' ', '_')],
      stockHistory: undefined,
      stockNews: [],
    });
  }

  public async getHistoricalDataByTicker(
    ticker: string,
    optionsRequest: HistoryRequestDto,
  ): Promise<HistoryGraphDto> {
    const history = await yahooFinance.historical(ticker, optionsRequest);
    const graph: HistoryGraphDto = { graphData: [] };
    history.map((data) =>
      graph.graphData.push({ date: data.date, close: data.close }),
    );
    return graph;
  }

  public async getSectorsMarketCap(): Promise<SectorsMarketCapDto[]> {
    const result: SectorsMarketCapDto[] = [];
    (await this.stocksDal.getSectorsMarketCap()).map((sector) => {
      result.push({ sector: sector._id, marketCap: sector.marketCap });
    });
    return result;
  }
}
