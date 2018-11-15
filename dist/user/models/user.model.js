"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("typegoose");
const base_model_1 = require("../../shared/base.model");
const is_email_1 = require("../../shared/utilities/is-email");
class User extends base_model_1.BaseModel {
    get fullName() {
        return `${this.firstName} ${this.lastName ? this.lastName : ''}`.trim();
    }
    static get model() {
        return new User().getModelForClass(User, { schemaOptions: base_model_1.schemaOptions });
    }
    static get modelName() {
        return this.model.modelName;
    }
}
__decorate([
    typegoose_1.prop({
        required: [true, 'Email is required'],
        validate: {
            validator: (value) => is_email_1.IsEmail(value),
            message: 'Invalid email'
        },
        unique: true
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typegoose_1.prop({
        required: [true, 'Password is required'],
        minlength: [6, 'Must be at least 6 characters']
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    typegoose_1.prop({ required: [true, 'First name is required'] }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], User.prototype, "fullName", null);
exports.User = User;
//# sourceMappingURL=user.model.js.map