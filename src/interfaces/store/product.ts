import { ObjectId } from "mongodb";

export default interface Product {
    _id?: string | ObjectId;
    name: string;
    price: number;
}