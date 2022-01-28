require('dotenv').config();
import BaseController from "./base.controller";
export default class BlogController extends BaseController {
    constructor() {
        super();
    }
    async getAll() {
        let items = new Array(0);
        try {
            await this.open();
            let collection = this.getCollection(process.env.COLLECTION_BLOG);
            let cursor = await collection.find({}, { projection: { "_id": 0 } });
            for await (const document of cursor) {
                items.push(document);
            }
            await this.close();
        }
        catch (err) {
            throw err;
        }
        return items;
    }
    async getOne(id) {
        let item = null;
        try {
            await this.open();
            let collection = this.getCollection(process.env.COLLECTION_BLOG);
            let cursor = await collection.findOne({ id: id }, { projection: { "_id": 0 } });
            item = cursor;
            await this.close();
        }
        catch (err) {
            throw err;
        }
        return item;
    }
    async insertOne(post) {
        try {
            await this.open();
            let collection = this.getCollection(process.env.COLLECTION_BLOG);
            await collection.insertOne(post);
            await this.close();
        }
        catch (err) {
            throw err;
        }
    }
    async updateOne(id, post) {
        try {
            await this.open();
            let collection = this.getCollection(process.env.COLLECTION_BLOG);
            await collection.updateOne({ id: id }, post);
            await this.close();
        }
        catch (err) {
            throw err;
        }
    }
}
