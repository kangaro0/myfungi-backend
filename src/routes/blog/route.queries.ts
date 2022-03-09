import { Request, Response, NextFunction } from "express"
import { ObjectId } from "mongodb";
import { parseNamedParameters, parseUrlEncoded, ParseDictionary, DefaultOptions } from "../../parsers/parser.request"

const parseDict: ParseDictionary = {
    "_id": ( val: string ) => { return new ObjectId( val ); }
}

const defaultOptions: DefaultOptions = {
    options: {
        offset: 0,
        limit: 20
    }
}

export const parseGetMany = ( req: Request, res: Response, next: NextFunction ) => {
    req.parsed = {
        params: parseNamedParameters( req.params, parseDict ),
        query: parseUrlEncoded( req.query, defaultOptions )
    };

    next();
}

export const parseGetOne = ( req: Request, res: Response, next: NextFunction ) => {
    req.parsed = {
        params: parseNamedParameters( req.params, parseDict )
    };

    next();
}