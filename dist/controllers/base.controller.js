require('dotenv').config();
import { MongoClient } from 'mongodb';
export default class BaseController {
    constructor() {
        this.client = new MongoClient(process.env.DATABASE_URI);
        this.connected = false;
    }
    async open() {
        if (this.connected)
            return;
        try {
            await this.client.connect();
        }
        catch (err) {
            throw err;
        }
        this.connected = true;
    }
    async close() {
        if (!this.connected)
            return;
        try {
            await this.client.close();
        }
        catch (err) {
            throw err;
        }
        this.connected = false;
    }
    getDatabase(name, options) {
        return this.client.db(name, options);
    }
    getCollection(name, options, dbName, dbOptions) {
        let db = dbName ? this.getDatabase(dbName, dbOptions) : this.getDatabase(process.env.DATABASE_NAME, dbOptions);
        return db.collection(name, options);
    }
}
