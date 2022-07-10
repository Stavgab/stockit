import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import envConfiguration from './utils/config/configuration';
import {StocksModule} from "./stocks/stocks.module";

@Module({
    imports: [
        StocksModule,
        ConfigModule.forRoot({
            load: [envConfiguration],
            isGlobal: true,
        }),],
})
export class AppModule {
}
