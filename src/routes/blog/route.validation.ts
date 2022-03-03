import Ajv, { ErrorObject } from 'ajv';
import { Request, Response, NextFunction } from 'express';
import { PostSchema, PutOneSchema, PutManySchema } from './route.schemas';
import Post from '../../interfaces/blog/post';
import Message from '../../interfaces/common/message';

const ajv = new Ajv();
const validatePostFnc = ajv.compile<Post>( PostSchema );
const validatePutOneFnc = ajv.compile<Post>( PutOneSchema );
const validatePutManyFnc = ajv.compile<Array<Post>>( PutManySchema );

export let validatePost = ( req: Request, res: Response, next: NextFunction ) => {
    if( validatePostFnc( req.body ) ){
        next();
        return;
    }
    
    let message = buildErrorMessage( validatePostFnc.errors );
    res.status( 400 ).json( message );    
}

export let validatePutOne = ( req: Request, res: Response, next: NextFunction ) => {
    // validate schema against request body and make sure that id given in query parameters matches the object's id
    if( validatePutOneFnc( req.body ) && req.body[ "_id" ] === req.params[ "id" ] )
        next();

    let message = buildErrorMessage( validatePutOneFnc.errors );
    res.status( 400 ).json( message ); 
}

export let validatePutMany = ( req: Request, res: Response, next: NextFunction ) => {
    if( validatePutManyFnc( req.body ) )
        next();

    let message = buildErrorMessage( validatePutManyFnc.errors );
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
