import { Request, Response } from 'express';
import { MongoError } from 'mongodb';
import Message from '../../interfaces/common/message';
import BlogController from '../../controllers/blog.controller';

let controller = new BlogController();

export let getAll = async ( req: Request, res: Response ) => {
    try {
        let items = await controller.getAll();
        res.status( 200 ).json( items );
    } catch( err ){
        let message: Message = { type: err.name, content: err.message };
        res.status( 500 ).json( message );
    }
};

export let getOne = async ( req: Request, res: Response ) => {
    try {
        let item = await controller.getOne( req.params[ "id" ] );
        res.status( 200 ).json( item );
    } catch( err ) {
        let message: Message = { type: err.name, content: err.message };
        res.status( 500 ).json( message );
    }
};

export let insertOne = async ( req: Request, res: Response ) => {
    try { 
        let _id = await controller.insertOne( req.body );

        let message: Message = { type: "Success", content: _id };
        res.status( 200 ).json( message );
    } catch( err ){
        let message: Message = { type: err.name, content: err.message };
        let status = 0;

        switch( ( err as MongoError ).code ){
            case 11000:                 // duplicate key
                status = 400;
            default:
                status = 500;
        }

        res.status( status ).json( message );
    }
};

export let updateOne = async ( req: Request, res: Response ) => {
    try {
        await controller.updateOne( req.params[ "id" ], req.body );

        let message: Message = { type: "Success", content: "" };
        res.status( 200 ).json( message );
    } catch( err ){
        let message: Message = { type: err.name, content: err.code };              // return err code here for debugging
        res.status( 500 ).json( message );
    }
};

export let deleteOne = async ( req: Request, res: Response ) => {
    try {
        await controller.deleteOne( req.params[ "id"] );

        let message: Message = { type: "Success", content: "" };
        res.status( 200 ).json( message );
    } catch( err ){
        let message: Message = { type: err.name, content: err.code };
        res.status( 500 ).json( message );
    }
};