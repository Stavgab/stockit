import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StockNewsService } from './stockNews.service';
import { StockNewsDto } from './dto/stockNewsDto';
import { ObjectId } from 'mongodb';

@Controller('news')
export class StockNewsController {
  constructor(private stockNewsService: StockNewsService) {}

  @Get()
  async getStockNews(): Promise<StockNewsDto[]> {
    return await this.stockNewsService.getStocksNews();
  }

  @Post()
  async createStockNews(@Body() news: StockNewsDto): Promise<void> {
    return await this.stockNewsService.createStockNews(news);
  }

  @Get('details/:id')
  async getStockNewsById(@Param('id') id: ObjectId): Promise<StockNewsDto> {
    return await this.stockNewsService.getStockNewsById(id);
  }

  @Post('delete/:id')
  async deleteStockNewsById(@Param('id') id: ObjectId): Promise<void> {
    return await this.stockNewsService.deleteStockNewsById(id);
  }

  @Post('update/:id')
  async updateStockNewsById(
    @Param('id') id: ObjectId,
    @Body() news: StockNewsDto,
  ): Promise<void> {
    return await this.stockNewsService.updateStockNewsById(id, news);
  }

  // @Get('scrap')
  // async scrapNews(): Promise<void> {
  //   return await this.stockNewsService.scrapNews();
  // }
}
