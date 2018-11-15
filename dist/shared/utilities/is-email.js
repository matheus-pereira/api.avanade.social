"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator = require("validator");
function IsEmail(value) {
    return Validator.isEmail(value);
}
exports.IsEmail = IsEmail;
//# sourceMappingURL=is-email.js.map