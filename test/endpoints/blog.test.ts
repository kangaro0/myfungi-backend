require( 'dotenv' ).config();
import * as fs from 'fs';
import request from 'supertest';

import createServer from '../../src/app';
import Post from '../../src/interfaces/blog/post';

let server;

// helper variables for created and deleted items during tests
let _id = "";

beforeAll( async () => {
    server = await createServer();
});

describe( 'GET /blog/', () => {
    it( 'should return all posts', ( done ) => {
        request( server )
            .get( '/blog' )
            .trustLocalhost()
            .expect( 'Content-Type', /json/ )
            .expect( 200 )
            .end( ( err, res ) => {
                if( err )
                    done( err );

                expect( res.body[ 0 ] ).toMatchObject({
                    "_id": "61f566b5d78961285a3fffc6",
                    "date": "29-01-2022",
                    "draft": false,
                    "published": false,
                    "title": "Hello World!",
                    "content": "This is an example."
                });

                done();
        });
    });

    it( 'should return single post', ( done ) => {
        let _id = "61f566b5d78961285a3fffc6";

        request( server )
            .get( `/blog/${_id}` )
            .trustLocalhost()
            .expect( 'Content-Type', /json/ )
            .expect( 200 )
            .end( ( err, res ) => {
                if( err )
                    done( err );

                expect( res.body ).toMatchObject({
                    "_id": _id,
                    "date": "29-01-2022",
                    "draft": false,
                    "published": false,
                    "title": "Hello World!",
                    "content": "This is an example."
                });

                done();
        });
    });
});

describe( 'POST /blog/', () => {
    it( 'should save new post', ( done ) => {
        let item: Post = {
            date: "28-01-2022",
            draft: true,
            published: true,
            title: "Hello World 2!",
            content: "This is an example."
        };

        request( server )
            .post( '/blog' )
            .send( item )
            .trustLocalhost()
            .expect( 'Content-Type', /json/ )
            .expect( 201 )
            .end( ( err, res ) => {
                if( err )
                    done( err );

                expect( res.body[ "type" ]).toEqual( "Success" );
                _id = res.body[ "content" ];

                done();
        });
    });
});

describe( 'PUT /blog/', () => {
    it( 'should update a post', ( done ) => {
        let item: Post = {
            _id: _id,
            date: "28-01-2022",
            draft: true,
            published: false,
            title: "Hello World 3",
            content: "Times are a-chaaanging."
        };

        request( server )
            .put( `/blog/${_id}` )
            .trustLocalhost()
            .send( item )
            .expect( 'Content-Type', /json/ )
            .expect( 200 )
            .end( ( err, res ) => {
                if( err )
                    done( err );

                expect( res.body[ "type" ] ).toEqual( "Success" );
                expect( res.body[ "content"] ).toMatchObject( item );
        });
    });

    //it( 'should not update ')
});

describe( 'DELETE /blog/', () => {    
    it( 'should delete a post', ( done ) => {
        request( server )
            .delete( `/blog/${_id}` )
            .trustLocalhost()
            .expect( 'Content-Type', /json/ )
            .expect( 200 )
            .end( ( err, res ) => {
                if( err )
                    done( err );

                expect( res.body[ "type" ] ).toEqual( "Success" );
                done();
        });
    });
});