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

  @Get(':id')
  async getStockById(@Param('id') id: ObjectId): Promise<StockDto> {
    return await this.stocksService.getStockById(id);
  }

  @Post(':id/delete')
  async deleteStockById(@Param('id') id: ObjectId): Promise<void> {
    return await this.stocksService.deleteStockById(id);
  }

  @Post(':id/update')
  async updateStockById(
    @Param('id') id: ObjectId,
    @Body() stock: StockDto,
  ): Promise<void> {
    return await this.stocksService.updateStockById(id, stock);
  }
}
