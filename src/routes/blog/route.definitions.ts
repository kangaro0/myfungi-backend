import { Router } from 'express';
import { getAll, getOne, insertOne, updateOne, updateMany, deleteOne } from './route.handlers';
import { validatePost, validatePutOne, validatePutMany } from './route.validation';

export let createBlogRouter = () => {
    let router = Router();

    // GET
    router.get( "/", getAll );
    router.get( "/:id", getOne );

    // POST
    router.post( "/", validatePost, insertOne );

    // PUT
    router.put( "/", validatePutMany, updateMany );         // gets removed in future...
    router.put( "/:id", validatePutOne, updateOne );

    // DELETE
    router.delete( "/:id", deleteOne );

    return router;
};