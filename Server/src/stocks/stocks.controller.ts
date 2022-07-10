import { Body, Controller, Get, Post } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StockDto } from './dto/stock.dto';

@Controller('stock')
export class StocksController {
  constructor(private stocksService: StocksService) {}

  @Get()
  async getStocks(): Promise<StockDto[]> {
    return await this.stocksService.getStocks();
  }

  @Post()
  async createStock(@Body() stock: StockDto): Promise<void> {
    return await this.stocksService.createStock(stock);
  }
}
