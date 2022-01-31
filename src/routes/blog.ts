import * as express from 'express';
import { MongoError } from 'mongodb';
import BlogController from '../controllers/blog.controller';
import Post from '../interfaces/blog/post'
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
    try {
        let item = await controller.getOne( req.params[ "id" ] );
        res.status( 200 ).json( item );
    } catch( err ) {
        let message: Message = { type: err.name, content: err.message };
        res.status( 500 ).json( message );
    }
});

// POST
router.post( "/", async ( req: Request, res: Response ) => {
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
});

// PUT
router.put( "/:id", async ( req: Request, res: Response ) => {
    try {
        await controller.updateOne( req.params[ "id" ], req.body as Post );

        let message: Message = { type: "Success", content: "" };
        res.status( 200 ).json( message );
    } catch( err ){
        let message: Message = { type: err.name, content: err.code };              // return err code here for debugging
        res.status( 500 ).json( message );
    }
});

// DELETE
router.delete( "/:id", async ( req: Request, res: Response ) => {
    try {
        await controller.deleteOne( req.params[ "id"] );

        let message: Message = { type: "Success", content: "" };
        res.status( 200 ).json( message );
    } catch( err ){
        let message: Message = { type: err.name, content: err.code };
        res.status( 500 ).json( message );
    }
});

const Router = router;
export default Router;