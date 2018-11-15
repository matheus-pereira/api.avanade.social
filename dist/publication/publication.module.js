"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const publication_controller_1 = require("./publication.controller");
const publication_service_1 = require("./publication.service");
const publication_model_1 = require("./models/publication.model");
const mongoose_1 = require("@nestjs/mongoose");
const user_service_1 = require("../user/user.service");
let PublicationModule = class PublicationModule {
};
PublicationModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: publication_model_1.Publication.modelName, schema: publication_model_1.Publication.model.schema }])],
        controllers: [publication_controller_1.PublicationController],
        providers: [publication_service_1.PublicationService, user_service_1.UserService]
    })
], PublicationModule);
exports.PublicationModule = PublicationModule;
//# sourceMappingURL=publication.module.js.map