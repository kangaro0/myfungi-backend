import express from 'express';
import Router from './routes/index';
let app = null;
let port = 1337;
async function main() {
    // setup express
    app = express();
    // register routes
    app.use('/', Router);
    // start up
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}
main();
