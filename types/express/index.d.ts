import { ObjectId } from 'mongodb';

declare global {
    namespace Express {
        export interface Request {
            parsed?: {
                params: {
                    _id?: ObjectId;
                },
                query?: {
                    criteria: {
                        [ x: string ]: any;
                    },
                    options: import( 'qs-to-mongo/lib/query/options-to-mongo' ).ParsedOptions;
                    links: ( url: string, totalCount: number ) => {
                        prev: string;
                        first: string;
                        next: string;
                        last: string;
                    }
                }
            }
        }
    }
}