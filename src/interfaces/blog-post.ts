import { ObjectId } from 'mongodb';

export default interface BlogPost {
    _id?: ObjectId;
    id: number;
    date: String;
    content: String;
}