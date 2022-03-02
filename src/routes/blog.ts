import * as express from 'express';
import { MongoError } from 'mongodb';
import BlogController from '../controllers/blog.controller';
import Post, { PostValidation } from '../interfaces/blog/post'
import { Message, matches } from './index';

type Request = express.Request;
type Response = express.Response;

let router = express.Router();
let controller = new BlogController();

let getAll = async ( req: Request, res: Response ) => {
    try {
        let items = await controller.getAll();
        res.status( 200 ).json( items );
    } catch( err ){
        let message: Message = { type: err.name, content: err.message };
        res.status( 500 ).json( message );
    }
};

let getOne = async ( req: Request, res: Response ) => {
    try {
        let item = await controller.getOne( req.params[ "id" ] );
        res.status( 200 ).json( item );
    } catch( err ) {
        let message: Message = { type: err.name, content: err.message };
        res.status( 500 ).json( message );
    }
};

let insertOne = async ( req: Request, res: Response ) => {
    try { 
        let _id = await controller.insertOne( req.body as Post )

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

let updateOne = async ( req: Request, res: Response ) => {
    try {
        await controller.updateOne( req.params[ "id" ], req.body as Post );

        let message: Message = { type: "Success", content: "" };
        res.status( 200 ).json( message );
    } catch( err ){
        let message: Message = { type: err.name, content: err.code };              // return err code here for debugging
        res.status( 500 ).json( message );
    }
};

let deleteOne = async ( req: Request, res: Response ) => {
    try {
        await controller.deleteOne( req.params[ "id"] );

        let message: Message = { type: "Success", content: "" };
        res.status( 200 ).json( message );
    } catch( err ){
        let message: Message = { type: err.name, content: err.code };
        res.status( 500 ).json( message );
    }
};

// GET
router.get( "/", getAll );
router.get( "/:id", getOne );

// POST
router.post( "/", insertOne );

// PUT
router.put( "/:id", updateOne );

// DELETE
router.delete( "/:id", deleteOne );

const Router = router;
export default Router;