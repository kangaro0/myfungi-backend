import express from 'express';
import { Express } from 'express-serve-static-core';
import bodyParser from 'body-parser';
import Router from './routes/index';

const port = 1337;

export default async function createServer(): Promise<Express> {
    return new Promise<Express>( ( resolve, reject ) => {
        // setup express
        const app = express();

        // register middleware
        app.use( bodyParser.json() );
        app.use( bodyParser.urlencoded({ extended: true }) );

        // register routes
        app.use( '/', Router );

        // start up
        app.listen( port, () => {
            console.log( `Server listening on port ${port}` );
            resolve( app );
        });
    });
}