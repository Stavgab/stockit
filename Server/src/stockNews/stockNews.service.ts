import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { StockNewsDal } from './stockNews.dal';
import { StockNewsDto } from './dto/stockNewsDto';
import { IntegerType, ObjectId } from 'mongodb';
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
    page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36')
    
    await page.goto('https://www.morningstar.com/search/articles?query=' + ticker);
    let stock = await this.stocksService.getStockByTicker(ticker);
    if (!stock) {
      await this.stocksService.scrapStockByTicker(ticker);
      stock = await this.stocksService.getStockByTicker(ticker);
    }
    const news: StockNewsDto[] = [];
    const metaData1 = (await page.$$eval('h2 > a',(test) => test.map(a => a.outerHTML)));
    for (let i=0; i< metaData1.length;i++){
      let source = metaData1[i].split('href="')[1].split('"')[0];
      const newPage = await this.browser.newPage();
      newPage.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36')
      await newPage.goto('https://www.morningstar.com' + source, {waitUntil: 'networkidle0'});
      let f = await newPage.content();
      let articleContext = '';
      const articleParagraphs = (await newPage.$$eval('.mdc-article-body > p', paragraph=>paragraph.map(p => p.textContent)));
      const author = await newPage.$$eval('a', ti => ti.map(t => t.textContent));
      const title = await newPage.$$eval('.article__author > a > span', au => au.map(a => a.textContent))[0];
      for(let i=0; i<articleParagraphs.length;i++){
        if (i==0){
          articleContext = articleContext.concat(articleParagraphs[i]);
        }
        else{
          articleContext = articleContext.concat('\n', articleParagraphs[i]);
        }
      }
      const newNew: StockNewsDto = {
        date: new Date(),
        stocks: stock._id,
        context: articleContext,
        sectors: stock.sector,
        title: title,
        source: source,
        author: author[51],
      };
      news.push(newNew);
      await this.createStockNews(newNew);
    }
    return news;
  }
}
