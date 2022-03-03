import Ajv from 'ajv';
import { Request, Response, NextFunction } from 'express';
import { PostSchema, PutSchema } from './route.schemas';
import Message from '../../interfaces/common/message';

const ajv = new Ajv();
const validatePostFnc = ajv.compile( PostSchema );
const validatePutFnc = ajv.compile( PutSchema );

export let validatePost = ( req: Request, res: Response, next: NextFunction ) => {
    if( validatePostFnc( req.body ) ){
        next();
        return;
    }

    console.log( validatePostFnc.errors );


    
    let message = {
        type: "Error",
        content: "Input validation failed."
    }

    res.status( 400 ).send( message );    
}

export let validatePut = ( req: Request, res: Response, next: NextFunction ) => {
    if( validatePutFnc( req.body ) )
        next();

    let message = {
        type: "Error",
        content: "Input validation failed."
    }
    
    res.status( 400 ).send( message ); 
}



