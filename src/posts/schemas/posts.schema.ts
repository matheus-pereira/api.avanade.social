import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
    user: {id:String, name:String},
    text: String,
    imagePath: String,
    likes: [{id:String,name:String}],
    timestamp: Date
})