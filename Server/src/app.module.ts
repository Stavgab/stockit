import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import envConfiguration from './utils/config/configuration';

@Module({
    imports: [ConfigModule.forRoot({
        load: [envConfiguration],
        isGlobal: true,
    }),],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
