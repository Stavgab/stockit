import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StockDto } from './dto/stock.dto';
import { ObjectId } from 'mongodb';
import { HistoryGraphDto } from './dto/history-graph.dto';
import { HistoryRequestDto } from './dto/history-request.dto';
import { SectorsMarketCapDto } from './dto/sectors-market-cap.dto';

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

  @Get('livesearch/:text')
  async getStocksByLiveSearch(@Param('text') text: string): Promise<StockDto[]> {
    return await this.stocksService.getStocksByLiveSearch(text);
  }

  @Get('details/:id')
  async getStockById(@Param('id') id: ObjectId): Promise<StockDto> {
    return await this.stocksService.getStockById(id);
  }

  @Get('ticker/:ticker')
  async getStockByTicker(@Param('ticker') ticker: string): Promise<StockDto> {
    return await this.stocksService.getStockByTicker(ticker);
  }

  @Delete('delete/:id')
  async deleteStockById(@Param('id') id: ObjectId): Promise<void> {
    return await this.stocksService.deleteStockById(id);
  }

  @Put('update/:id')
  async updateStockById(
    @Param('id') id: ObjectId,
    @Body() stock: StockDto,
  ): Promise<void> {
    return await this.stocksService.updateStockById(id, stock);
  }

  @Get('scrap/:ticker')
  async scrapStocksByTicker(@Param('ticker') ticker: string): Promise<void> {
    return await this.stocksService.scrapStockByTicker(ticker);
  }

  @Post('history/:ticker')
  async getHistoricalDataByTicker(
    @Param('ticker') ticker: string,
    @Body() optionsRequest: HistoryRequestDto,
  ): Promise<HistoryGraphDto> {
    return await this.stocksService.getHistoricalDataByTicker(
      ticker,
      optionsRequest,
    );
  }

  @Get('sectors')
  async getSectorsMarketCap(): Promise<SectorsMarketCapDto[]> {
    return await this.stocksService.getSectorsMarketCap();
  }
}
