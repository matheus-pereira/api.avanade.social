"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    timestamp: Date
});
//# sourceMappingURL=users.schema.js.map