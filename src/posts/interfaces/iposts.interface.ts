import { Document } from 'mongoose';

export interface IPost extends Document {
    _id: string;
    user: {id:string, name:string};
    text: string;
    imagePath: string;
    likes: [{id:string,name:string}];
    timestamp: Date;
}