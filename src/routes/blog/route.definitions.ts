import { Router } from 'express';
import { getMany, getOne, insertOne, updateOne, updateMany, deleteOne } from './route.handlers';
import { validatePost, validatePutOne, validatePutMany } from './route.validation';
import { parseGetMany, parseGetOne } from './route.queries';

export let createBlogRouter = () => {
    let router = Router();

    // GET
    router.get( "/", parseGetMany, getMany );
    router.get( "/:_id", parseGetOne, getOne );

    // POST
    router.post( "/", validatePost, insertOne );

    // PUT
    router.put( "/", validatePutMany, updateMany );         // gets removed in future...
    router.put( "/:_id", validatePutOne, updateOne );

    // DELETE
    router.delete( "/:_id", deleteOne );

    return router;
};