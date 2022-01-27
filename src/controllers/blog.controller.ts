require( 'dotenv' ).config()
import BaseController from "./base.controller";
import BlogPost from '../interfaces/blog-post';

export default class BlogController extends BaseController {
    
    constructor(){
        super();
    }

    public async getAll(){
        let items = new Array<BlogPost>( 0 );

        try {
            await this.open();

            let collection = this.getCollection( process.env.COLLECTION_BLOG );

            let cursor = await collection.find( {}, { projection: { "_id": 0 } } );
            for await( const document of cursor ){
                items.push( document as BlogPost );
            }

            await this.close();
        } catch( err ){
            throw err;
        }

        return items;
    }

    public async getOne( id: number ){
        let item = null;

        try {
            await this.open();
            
            let collection = this.getCollection( process.env.COLLECTION_BLOG );

            let cursor = await collection.findOne( { id: id }, { projection: { "_id": 0 } } );
            item = cursor as BlogPost;

            await this.close();
        
        } catch( err ){
            throw err;
        }

        return item;
    }

    public async insertOne( post: BlogPost ){
        try {
            await this.open();

            let collection = this.getCollection( process.env.COLLECTION_BLOG );
            await collection.insertOne( post );

            await this.close();
        } catch( err ){
            throw err;
        }
    }

    public async updateOne( id: number, post: BlogPost ){
        try { 
            await this.open();

            let collection = this.getCollection( process.env.COLLECTION_BLOG );
            await collection.updateOne( { id: id }, post );
            
            await this.close();
        } catch( err ){
            throw err;
        }
    }
}