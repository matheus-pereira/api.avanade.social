const mongoose = require('mongoose');
const DB_URL = require('./config').database;

mongoose.connect(DB_URL, { useNewUrlParser: true });

exports.users = mongoose.model('user', new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    created: Date
}));

exports.posts = mongoose.model('post', new mongoose.Schema({
    text: String,
    imagePath: String,
    likes: [{ userId: String, userName: String }],
    created: Date
}));