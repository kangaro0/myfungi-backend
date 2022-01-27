import * as express from 'express';

// Messages
export interface Message {
    type: "Error" | "Success";
    content: string;
}

// MongoDB Error Codes
// https://github.com/mongodb/mongo/blob/master/src/mongo/base/error_codes.yml

let router = express.Router();

// setup middleware
