import createServer from './app';

createServer()
    .then( ( app ) => {
        process.once( 'SIGINT', ( code ) => {
            console.log( 'Server shutting down...' );
            app.close();
        });
    })
    .catch( ( err ) => {
        console.log( err );
    });