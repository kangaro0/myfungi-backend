import { ObjectId } from 'mongodb';

export default interface Post {
    _id?: string | ObjectId;
    date: String;
    draft: boolean;
    published: boolean;
    title: string;
    content: string;
}