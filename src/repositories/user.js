const db = require('../config/database');

exports.findByCredentials = function(email, password) {
    return db.users.findOne({ email, password });
}