import { MongoClient, Db } from 'mongodb';

var CONFIG = {
    uri: "mongodb://127.0.0.1/",
    db: "myfungi_db"
}

export class IsNotConnectedError extends Error {
    constructor( message ){
        super( message );
        this.name = "IsNotConnectedError";
    }
}

export default class Connection {

    static INSTANCE: Connection;

    private client: MongoClient;
    private connected: boolean;

    private constructor(){
        this.client = new MongoClient( CONFIG.uri );
    }

    public isConnected(){
        return this.connected;
    }

    public async connect(){
        if( this.isConnected() )
            return;

        try {
            await this.client.connect()
        } catch( error ){
            throw error;
        }

        this.connected = true;
    }

    public async close(){
        if( !this.isConnected() )
            return;

        try {
            await this.client.close();
        } catch( error ){
            throw error;
        }

        this.connected = false;
    }

    public database( name: String ) {
        if( !this.isConnected() )
            throw( new IsNotConnectedError( "Cannot fetch database before a connection to the database is opened." ) );

        return this.client.db( name as string );
    }

    static getInstance(): Connection {
        if( Connection.INSTANCE === null ){
            Connection.INSTANCE = new Connection()
        }
        return Connection.INSTANCE;
    }
}