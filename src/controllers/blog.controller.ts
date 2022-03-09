require( 'dotenv' ).config()
import { ObjectId, Document, Filter, FindOptions } from "mongodb";
import BaseController from "./base.controller";
import Post from "../interfaces/blog/post";

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

    public async getMany( criteria: Filter<Post>, options?: FindOptions<Post> | null ): Promise<Array<Post>> {
        let items = new Array<Post>( 0 );

        try {
            await this.open();

            let collection = this.getCollection( process.env.COLLECTION_BLOG );
            let cursor = collection.find( criteria, options );

            for await( const document of cursor )
                items.push( document as Post );

        } catch( err ) {
            throw err;
        }

        return items;
    }

    public async getOne( criteria: Filter<Post>, options?: FindOptions<Post> ): Promise<Post> {
        let item = null;

        criteria._id = new ObjectId( criteria._id as string );

        try {
            await this.open();
            
            let collection = this.getCollection( process.env.COLLECTION_BLOG );

            let cursor = await collection.findOne( criteria, options );
            item = cursor ? map_out_fnc( cursor ) : {};

            await this.close();
        
        } catch( err ){
            throw err;
        }

        return item;
    }

    public async insertOne( post: Post ): Promise<Post> {
        try {
            await this.open();
         
            let collection = this.getCollection( process.env.COLLECTION_BLOG );
            await collection.insertOne( post as Document );

            await this.close();
        } catch( err ){
            throw err;
        }

        return post;
    }

    public async updateOne( id: string, post: Post ): Promise<Post> {
        // delete _id from object if it exists
        if( post._id )
            delete post._id;

        try { 
            await this.open();

            let collection = this.getCollection( process.env.COLLECTION_BLOG );
            await collection.updateOne( { _id: new ObjectId( id ) }, { $set: post } );
            
            await this.close();
        } catch( err ){
            throw err;
        }

        // add it back & return updated object
        post._id = id;
        return post;
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

    public async count( criteria: Filter<Post> ): Promise<number> {
        let num = 0;
        
        try {
            await this.open();

            let collection = this.getCollection( process.env.COLLECTION_BLOG );
            num = await collection.count( criteria );

            await this.close();
        } catch( err ){
            throw err;
        }

        return num;
    }
}