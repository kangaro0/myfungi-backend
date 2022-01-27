import Connection, { IsNotConnectedError } from './database/connection';

let connection = null;

async function main(){
    // setup database connection
    connection = Connection.getInstance();
    await connection.connect();


}

main();