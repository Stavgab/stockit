import { MongoConnector } from '../mongo/connector';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { StocksService } from './stocks.service';
import { StocksDal } from './stocks.dal';
import { StocksController } from './stocks.controller';
import { Module } from '@nestjs/common';

@Module({
  providers: [StocksService, StocksDal, ConfigService, MongoConnector],
  controllers: [StocksController],
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        maxRedirects: 5,
      }),
    }),
  ],
})
export class StocksModule {}
