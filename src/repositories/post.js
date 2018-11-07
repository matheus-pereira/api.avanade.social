const db = require('../config/database');

exports.findById = function(id) {
    return db.posts.findById(id);
}