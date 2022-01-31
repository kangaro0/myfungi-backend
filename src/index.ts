import createServer from './app';

let server = null;
createServer().then( ( app ) => {
    server = app;

    process.once( 'SIGINT', ( code ) => {
        console.log( 'Server shutting down...' );
        server.close();
    });
});