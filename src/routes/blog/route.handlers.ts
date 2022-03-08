import { Request, Response } from 'express';
import { MongoError } from 'mongodb';
import Post from '../../interfaces/blog/post';
import BlogController from '../../controllers/blog.controller';

let controller = new BlogController();

export let getAll = async ( req: Request, res: Response ) => {
    try {
        let items = await controller.getAll();
        res.status( 200 ).json( items );
    } catch( err ){
        res.status( 500 ).json( err );
    }
};

export let getOne = async ( req: Request, res: Response ) => {
    try {
        let item = await controller.getOne( { _id: req.params[ "id" ] } );
        res.status( 200 ).json( item );
    } catch( err ) {
        res.status( 500 ).json( err );
    }
};

export let insertOne = async ( req: Request, res: Response ) => {
    try { 
        let inserted = await controller.insertOne( req.body );
        res.status( 201 ).json( inserted );
    } catch( err ){
        res.status( 500 ).json( err );
    }
};

export let updateOne = async ( req: Request, res: Response ) => {
    try {
        let updated = await controller.updateOne( req.params[ "id" ], req.body );
        res.status( 200 ).json( updated );
    } catch( err ){           
        res.status( 500 ).json( err );
    }
};

export let updateMany = async ( req: Request, res: Response ) => {
    try {
        let items = req.body as Array<Post>;
        let length = items.length;

        // check if all items that need to be update exist in database
        for( let i = 0 ; i < length ; i++ ){
            let item = items[ i ];
            if( !controller.count({ _id: item._id }) )
                throw new MongoError( "" ); 
        }

        let updatedItems = new Array<Post>( 0 );

        for( let i = 0 ; i < length ; i++ ){
            let item = items[ i ];
            let updated = await controller.updateOne( item._id as string, item );
            updatedItems.push( updated );
        }

        res.status( 200 ).json( updatedItems );
    } catch( err ){
        res.status( 500 ).json( err );
    }
}

export let deleteOne = async ( req: Request, res: Response ) => {
    try {
        await controller.deleteOne( req.params[ "id"] );
        res.status( 200 ).end();
    } catch( err ){
        res.status( 500 ).json( err );
    }
};