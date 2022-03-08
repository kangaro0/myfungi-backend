import Ajv, { ErrorObject } from 'ajv';
import { Request, Response, NextFunction } from 'express';
import { PostSchema, PutOneSchema, PutManySchema } from './route.schemas';
import Post from '../../interfaces/blog/post';
import Message from '../../interfaces/common/message';

const ajv = new Ajv();
const validatePostImpl = ajv.compile<Post>( PostSchema );
const validatePutOneImpl = ajv.compile<Post>( PutOneSchema );
const validatePutManyImpl = ajv.compile<Array<Post>>( PutManySchema );

export let validatePost = ( req: Request, res: Response, next: NextFunction ) => {
    if( validatePostImpl( req.body ) ){
        next();
        return;
    }
    
    let message = buildErrorMessage( validatePostImpl.errors );
    res.status( 400 ).json( message );    
}

export let validatePutOne = ( req: Request, res: Response, next: NextFunction ) => {
    if( validatePutOneImpl( req.body ) ){
        next();
        return;
    }

    let message = buildErrorMessage( validatePutOneImpl.errors );
    res.status( 400 ).json( message ); 
}

export let validatePutMany = ( req: Request, res: Response, next: NextFunction ) => {
    if( validatePutManyImpl( req.body ) ){
        next();
        return;
    }

    let message = buildErrorMessage( validatePutManyImpl.errors );
    res.status( 400 ).json( message );
}

// helper function for parsing error objects from validator
type ErrorArray = Array<ErrorObject<string, Record<string, any>>>;

let parseErrors = ( errors: ErrorArray ): Array<string> => {
    let results = new Array<string>( 0 );
    
    let length = errors.length;
    for( let i = 0 ; i < length ; i++ ){
        let error = errors[ i ];
        results.push( error.message );
    }

    return results;
}

// helper function to build error message
let buildErrorMessage = ( errors: ErrorArray ): Message => {
    let content = parseErrors( errors );
    return {
        type: "Error",
        content: content.length > 1 ? content : content[ 0 ]
    }
}
