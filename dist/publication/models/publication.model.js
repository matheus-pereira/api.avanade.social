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
const user_resume_vm_model_1 = require("../../user/models/view-models/user-resume-vm.model");
const base_model_1 = require("../../shared/base.model");
class Publication extends base_model_1.BaseModel {
    get totalLikes() {
        return `${this.likes.length}`;
    }
    static get model() {
        return new Publication().getModelForClass(Publication, { schemaOptions: base_model_1.schemaOptions });
    }
    static get modelName() {
        return this.model.modelName;
    }
}
__decorate([
    typegoose_1.prop({ required: [true, 'User is required'] }),
    __metadata("design:type", user_resume_vm_model_1.UserResumeVm)
], Publication.prototype, "user", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Publication.prototype, "text", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Publication.prototype, "imagePath", void 0);
__decorate([
    typegoose_1.arrayProp({ items: user_resume_vm_model_1.UserResumeVm, default: [] }),
    __metadata("design:type", Array)
], Publication.prototype, "likes", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], Publication.prototype, "totalLikes", null);
exports.Publication = Publication;
//# sourceMappingURL=publication.model.js.map