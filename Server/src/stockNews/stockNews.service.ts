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

  public async scrapNews(ticker: string): Promise<StockNewsDto[]> {
    const page = await this.browser.newPage();
    await page.goto('https://finance.yahoo.com/quote/' + ticker);
    let stock = await this.stocksService.getStockByTicker(ticker);
    if (!stock) {
      await this.stocksService.scrapStockByTicker(ticker);
      stock = await this.stocksService.getStockByTicker(ticker);
    }
    const news: StockNewsDto[] = [];
    for (let i = 0; i < 7; i++) {
      const metaData = (
        await page.$$eval(
          'div > #quoteNewsStream-0-Stream >  ul > li:nth-child(' +
            (i + 1) +
            ') > div > div > div:nth-child(2) > h3',
          (test) => test.map((t) => t.innerHTML),
        )
      )[0];
      if (metaData) {
        const newNew: StockNewsDto = {
          date: new Date(),
          stocks: stock._id,
          sectors: stock.sector,
          title: metaData.split('</u>')[1].split('</a>')[0],
          source:
            'https://finance.yahoo.com' +
            metaData.split('href="')[1].split('"')[0],
          author: (
            await page.$$eval(
              'div > #quoteNewsStream-0-Stream > ul > li:nth-child(' +
                (i + 1) +
                ') > div > div > div:nth-child(2) > div',
              (test) => test.map((t) => t.textContent),
            )
          )[0].split('•')[0],
        };
        news.push(newNew);
        await this.createStockNews(newNew);
      }
    }
    return news;
  }
}
