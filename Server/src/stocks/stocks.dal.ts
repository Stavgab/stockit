import {Collection} from "mongodb";
import {Injectable} from "@nestjs/common";
import {MongoConnector} from "../mongo/connector";
import {StockDto} from "./dto/stock.dto";

const STOCKS_COLLECTION_NAME = 'stocks';

type StocksCollection = Collection<StockDto>;


@Injectable()
export class StocksDal {
    constructor(private mongoConnector: MongoConnector) {
    }

    private async getStocksDbConnection(): Promise<StocksCollection> {
        const db = await this.mongoConnector.getDbInstance();
        return db.collection(STOCKS_COLLECTION_NAME);
    }


    public async getStocks(): Promise<StockDto[]> {
        const collection = await this.getStocksDbConnection();
        return collection.find().toArray();
    }


    public async createStock(stock: StockDto): Promise<void> {
        const collection = await this.getStocksDbConnection();
        await collection.insertOne(stock);
    }
}
