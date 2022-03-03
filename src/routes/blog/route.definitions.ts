import { Router } from 'express';
import { getAll, getOne, insertOne, updateOne, deleteOne } from './route.handlers';
import { validatePost, validatePut } from './route.validation';

export let createBlogRouter = () => {
    let router = Router();

    // GET
    router.get( "/", getAll );
    router.get( "/:id", getOne );

    // POST
    router.post( "/", validatePost, insertOne );

    // PUT
    router.put( "/:id", validatePut, updateOne );

    // DELETE
    router.delete( "/:id", deleteOne );

    return router;
};