require( 'dotenv' ).config()
import { ObjectId, Document } from "mongodb";
import BaseController from "./base.controller";
import Post from '../interfaces/blog/post';

const map_in_fnc = ( post: Post ): Document => {
    return {
        date: post.date,
        draft: post.draft,
        published: post.published,
        title: post.title,
        content: post.content
    };
};

const map_out_fnc = ( doc: Document ): Post => {
    return {
        _id: ( doc._id as ObjectId ).toString(),
        date: doc.date,
        draft: doc.draft,
        published: doc.published,
        title: doc.title,
        content: doc.content
    };
};

export default class BlogController extends BaseController {
    
    constructor(){
        super();
    }

    public async getAll(): Promise<Array<Post>> {
        let items = new Array<Post>( 0 );

        try {
            await this.open();

            let collection = this.getCollection( process.env.COLLECTION_BLOG );

            let cursor = await collection.find( {} );
            for await( const document of cursor ){
                items.push( map_out_fnc( document ) );
            }

            await this.close();
        } catch( err ){
            throw err;
        }

        return items;
    }

    public async getOne( id: string ): Promise<Post> {
        let item = null;

        try {
            await this.open();
            
            let collection = this.getCollection( process.env.COLLECTION_BLOG );

            let cursor = await collection.findOne( { _id: new ObjectId( id ) } );
            item = cursor ? map_out_fnc( cursor ) : {};

            await this.close();
        
        } catch( err ){
            throw err;
        }

        return item;
    }

    public async insertOne( post: Post ): Promise<string> {
        let insert = map_in_fnc( post );
        try {
            await this.open();
         
            let collection = this.getCollection( process.env.COLLECTION_BLOG );
            await collection.insertOne( insert );

            await this.close();
        } catch( err ){
            throw err;
        }
        return insert._id;
    }

    public async updateOne( id: string, post: Post ): Promise<void> {
        try { 
            await this.open();

            let collection = this.getCollection( process.env.COLLECTION_BLOG );
            await collection.updateOne( { _id: new ObjectId( id ) }, { $set: map_in_fnc( post ) } );
            
            await this.close();
        } catch( err ){
            throw err;
        }
    }

    public async deleteOne( id: string ): Promise<void> {
        try {
            await this.open();

            let collection = this.getCollection( process.env.COLLECTION_BLOG );
            await collection.deleteOne( { _id: new ObjectId( id ) } );

            await this.close();
        } catch( err ){
            throw err;
        }
    }
}