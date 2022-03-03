require( 'dotenv' ).config();
import * as fs from 'fs';
import * as https from 'https';
import express from 'express';
import { Express } from 'express-serve-static-core';
import { createRoutes } from './routes/index';

const port = 1337;

export default async function createServer(): Promise<https.Server> {
    return new Promise<https.Server>( ( resolve, reject ) => {
        try {
            // setup express
            const app = express();

            app.enable( 'etag' );       // enable etag-caching for browsers

            // register routes
            app.use( '/', createRoutes() );

            // load certificates
            let credentials = {
                key: fs.readFileSync( process.env.SSL_KEY_PATH, 'utf8' ),
                cert: fs.readFileSync( process.env.SSL_CERT_PATH, 'utf8' )
            };

            // start up
            const server = https.createServer( credentials, app );
            server.listen( 1337, () => {
                console.log( 'Server listening on port: 1337' );
                resolve( server );
            });
            
        } catch( err ){
            reject( err );
        }
    });
}