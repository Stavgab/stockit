import { MongoConnector } from '../mongo/connector';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { StockNewsService } from './stockNews.service';
import { StockNewsDal } from './stockNews.dal';
import { StockNewsController } from './stockNews.controller';
import { Module } from '@nestjs/common';
import { StocksService } from '../stocks/stocks.service';
import { StocksDal } from '../stocks/stocks.dal';
import { PuppeteerModule } from 'nest-puppeteer';

@Module({
  providers: [
    StocksService,
    StocksDal,
    StockNewsService,
    StockNewsDal,
    ConfigService,
    MongoConnector,
  ],
  controllers: [StockNewsController],
  imports: [
    PuppeteerModule.forFeature(),
    HttpModule.registerAsync({
      useFactory: () => ({
        maxRedirects: 5,
      }),
    }),
  ],
})
export class StockNewsModule {}
