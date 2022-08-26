import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { StocksService } from './stocks.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
  },
})
export class StocksGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly stocksService: StocksService) {}

  @SubscribeMessage('listLiveUpdate')
  public async listStockTicker(@MessageBody('ticker') ticker: string) {
    console.log(ticker);
    const intervals = this.stocksService.schedulerRegistry.getIntervals();
    if (!(`liveUpdate${ticker}` in intervals)) {
      const interval = setInterval(async () => {
        await this.stocksService.liveUpdateStockPriceByTicker(ticker);
        this.server.sockets.emit(
          'liveUpdate' + ticker,
          await this.stocksService.getStockByTicker(ticker),
        );
      }, 10000);
      this.stocksService.schedulerRegistry.addInterval(
        'liveUpdate' + ticker,
        interval,
      );
    }
  }

  @SubscribeMessage('unlistLiveUpdate')
  public async unlistStockTicker(@MessageBody('ticker') ticker: string) {
    await this.stocksService.disableLiveUpdateStockPriceByTicker(ticker);
    this.stocksService.schedulerRegistry.getInterval(
      'liveUpdate' + ticker.toUpperCase(),
    );
    this.stocksService.schedulerRegistry.deleteInterval(
      'liveUpdate' + ticker.toUpperCase(),
    );
    this.server.sockets.emit('unlistLiveUpdate' + ticker, ticker);
  }
}
