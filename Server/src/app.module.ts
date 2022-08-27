import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StocksModule } from './stocks/stocks.module';
import { StockNewsModule } from './stockNews/stockNews.module';
import { PuppeteerModule } from 'nest-puppeteer';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    StocksModule,
    StockNewsModule,
    ScheduleModule.forRoot(),
    PuppeteerModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
