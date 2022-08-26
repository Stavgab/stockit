import { MongoConnector } from '../mongo/connector';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { StocksService } from './stocks.service';
import { StocksDal } from './stocks.dal';
import { StocksController } from './stocks.controller';
import { Module } from '@nestjs/common';
import { PuppeteerModule } from 'nest-puppeteer';
import { StocksGateway } from './stocks.gateway';

@Module({
  providers: [
    StocksGateway,
    StocksService,
    StocksDal,
    ConfigService,
    MongoConnector,
  ],
  controllers: [StocksController],
  imports: [
    PuppeteerModule.forFeature(),
    HttpModule.registerAsync({
      useFactory: () => ({
        maxRedirects: 5,
      }),
    }),
  ],
})
export class StocksModule {}
