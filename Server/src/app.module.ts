import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StocksModule } from './stocks/stocks.module';
import { StockNewsModule } from './stockNews/stockNews.module';

@Module({
  imports: [
    StocksModule,
    StockNewsModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
