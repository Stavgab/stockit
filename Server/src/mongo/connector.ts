import {Inject, Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {Db, MongoClient} from 'mongodb';

@Injectable()
export class MongoConnector {
    @Inject()
    private configService: ConfigService;
    private db: Db;

    public async connect(): Promise<Db> {
        const mongoURI = this.mongoURI;
        const mongoClient = await MongoClient.connect(mongoURI, {
            ignoreUndefined: true,
        });
        this.db = mongoClient.db(this.configService.get('dbName'));
        return this.db;
    }

    public async getDbInstance(): Promise<Db> {
        if (this.db != null) {
            return this.db;
        } else {
            try {
                await this.connect();
            } catch (e) {
                console.log(JSON.stringify(e));
            }
            return this.db;
        }
    }

    private get mongoURI(): string {
        return `mongodb+srv://${this.configService.get(
            'dbUserName',
        )}:${this.configService.get('dbPassword')}@${this.configService.get(
            'dbServers',
        )}.khwvaot.mongodb.net/${this.configService.get(
            'dbName',
        )}?retryWrites=true&w=majority`;
    }
}
