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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const publication_model_1 = require("./models/publication.model");
const base_service_1 = require("../shared/base.service");
const user_service_1 = require("../user/user.service");
const mapper_service_1 = require("../shared/mapper/mapper.service");
const user_resume_vm_model_1 = require("../user/models/view-models/user-resume-vm.model");
let PublicationService = class PublicationService extends base_service_1.BaseService {
    constructor(_publicationModel, _userService, _mapperService) {
        super();
        this._publicationModel = _publicationModel;
        this._userService = _userService;
        this._mapperService = _mapperService;
        this._model = _publicationModel;
        this._mapper = _mapperService.mapper;
    }
    createPublication(user, text, imagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPublication = new this._model();
            newPublication.user = new user_resume_vm_model_1.UserResumeVm();
            newPublication.user.id = user.id;
            newPublication.user.name = user.fullName;
            newPublication.user.avatar = user.avatar;
            newPublication.text = text;
            if (imagePath) {
                newPublication.imagePath = imagePath;
            }
            try {
                const result = yield this.create(newPublication);
                return result.toJSON();
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    findPublications(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.find(filter).limit(10).sort({ createdAt: -1 }).exec();
        });
    }
    like(publicationId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let publication = yield this.findById(publicationId);
                let newLike = new user_resume_vm_model_1.UserResumeVm();
                newLike.id = user.id;
                newLike.name = user.fullName;
                const index = publication.likes.findIndex(like => like.id == newLike.id);
                if (index < 0) {
                    publication.likes.push(newLike);
                    publication = yield yield this.update(publicationId, publication);
                }
                return publication;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    unlike(publicationId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let publication = yield this.findById(publicationId);
                let like = new user_resume_vm_model_1.UserResumeVm();
                like.id = user.id;
                like.name = user.fullName;
                const index = publication.likes.findIndex(oldLike => oldLike.id == like.id);
                if (index !== -1) {
                    publication.likes.splice(index, 1);
                    publication = yield this.update(publicationId, publication);
                }
                return publication;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
PublicationService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(publication_model_1.Publication.modelName)),
    __metadata("design:paramtypes", [Object, user_service_1.UserService,
        mapper_service_1.MapperService])
], PublicationService);
exports.PublicationService = PublicationService;
//# sourceMappingURL=publication.service.js.map