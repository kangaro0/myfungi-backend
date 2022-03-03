import { Router } from 'express';
import bodyParser from 'body-parser';
import { createBlogRouter } from './blog/route.definitions';

// MongoDB Error Codes
// https://github.com/mongodb/mongo/blob/master/src/mongo/base/error_codes.yml

export let createRoutes = () => {
    let router = Router();

    // setup global middleware
    router.use( bodyParser.json() );

    // setup child routes
    router.use( '/blog', createBlogRouter() );

    return router;
}