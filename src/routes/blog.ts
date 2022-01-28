import * as express from 'express';
import { MongoError } from 'mongodb';
import BlogController from '../controllers/blog.controller';
import BlogPost from '../interfaces/blogpost'
import { Message } from './index';

type Request = express.Request;
type Response = express.Response;

let router = express.Router();
let controller = new BlogController();

// GET
router.get( "/", async ( req: Request, res: Response ) => {
    try {
        let items = await controller.getAll();
        res.status( 200 ).json( items );
    } catch( err ){
        let message: Message = { type: err.name, content: err.message };
        res.status( 500 ).json( message );
    }
});

router.get( "/:id", async ( req: Request, res: Response ) => {
    let id = null;
    try {
        id = parseInt( req.params[ 0 ] );
    } catch( err ){
        let message: Message = { type: err.name, content: "Bad request" };
        res.status( 400 ).json( message );
        return;
    }
    
    try {
        let item = await controller.getOne( id );
        res.status( 200 ).json( item );
    } catch( err ) {
        let message: Message = { type: err.name, content: err.message };
        res.status( 500 ).json( message );
    }
});

// POST
router.post( "/", async ( req: Request, res: Response ) => {
    try { 
        await controller.insertOne( req.body as BlogPost )

        let message: Message = { type: "Success", content: "" };
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
});

// PUT
router.put( "/:id", async ( req: Request, res: Response ) => {
    let id = null;
    try {
        id = parseInt( req.params[ 0 ] );
    } catch( err ){
        let message: Message = { type: err.name, content: "Bad request" };
        res.status( 400 ).json( message );
        return;
    }

    try {
        await controller.updateOne( id, req.body as BlogPost );

        let message: Message = { type: "Success", content: "" };
        res.send( 200 ).json( message );
    } catch( err ){
        let message: Message = { type: err.name, content: err.code };              // return err code here for debugging
        res.status( 500 ).json( message );
    }
});

// DELETE
router.delete( "/:id", ( req: Request, res: Response ) => {

});

const Router = router;
export default Router;