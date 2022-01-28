require( 'dotenv' ).config();
import { MongoClient, Db, DbOptions, Collection, CollectionOptions } from 'mongodb';

export default class BaseController {

    private client: MongoClient;
    private connected: boolean;

    constructor() {
        this.client = new MongoClient( process.env.DATABASE_URI );
        this.connected = false;
    }

    protected async open(): Promise<void> {
        if( this.connected )
            return;

        try {
            await this.client.connect();
        } catch( err ){
            throw err;
        }

        this.connected = true;
    }

    protected async close(): Promise<void> {
        if( !this.connected )
            return;

        try {
            await this.client.close();
        } catch( err ){
            throw err;
        }

        this.connected = false;
    }

    protected getDatabase( name: String, options?: DbOptions ): Db {
        return this.client.db( name as string, options );
    }

    protected getCollection( name: String, options?: CollectionOptions, dbName?: String, dbOptions?: DbOptions ): Collection {
        let db = dbName ? this.getDatabase( dbName, dbOptions ) : this.getDatabase( process.env.DATABASE_NAME, dbOptions );
        return db.collection( name as string, options );
    }
}