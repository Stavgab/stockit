import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StockDto } from './dto/stock.dto';
import { ObjectId } from 'mongodb';

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

  @Get('details/:id')
  async getStockById(@Param('id') id: ObjectId): Promise<StockDto> {
    return await this.stocksService.getStockById(id);
  }

  @Post('delete/:id')
  async deleteStockById(@Param('id') id: ObjectId): Promise<void> {
    return await this.stocksService.deleteStockById(id);
  }

  @Post('update/:id')
  async updateStockById(
    @Param('id') id: ObjectId,
    @Body() stock: StockDto,
  ): Promise<void> {
    return await this.stocksService.updateStockById(id, stock);
  }

  @Get('scrap')
  async scrapStocks(): Promise<void> {
    return await this.stocksService.scrapStocks();
  }

  @Get('scrap/:ticker')
  async scrapStocksByTicker(
    @Param('ticker') ticker: string,
  ): Promise<StockDto> {
    return await this.stocksService.scrapStockByTicker(ticker);
  }
}
