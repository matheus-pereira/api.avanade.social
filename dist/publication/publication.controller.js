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
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const publication_model_1 = require("./models/publication.model");
const publication_service_1 = require("./publication.service");
const publication_vm_model_1 = require("./models/view-models/publication-vm.model");
const publication_params_model_1 = require("./models/view-models/publication-params.model");
const lodash_1 = require("lodash");
const api_exception_model_1 = require("../shared/api-exception.model");
const get_operation_id_1 = require("../shared/utilities/get-operation-id");
const is_date_1 = require("../shared/utilities/is-date");
let PublicationController = class PublicationController {
    constructor(_publicationService) {
        this._publicationService = _publicationService;
    }
    create(request, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { text, imagePath } = params;
            if (!text) {
                throw new common_1.HttpException('Publication text is required', common_1.HttpStatus.BAD_REQUEST);
            }
            const user = request.user;
            try {
                const newPublication = yield this._publicationService.createPublication(user, text, imagePath);
                return this._publicationService.map(newPublication);
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    get(fromDate, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let filter = {};
                if (fromDate) {
                    if (!is_date_1.IsDate(fromDate)) {
                        throw new common_1.HttpException('Invalid date format', common_1.HttpStatus.BAD_REQUEST);
                    }
                    filter['createdAt'] = { $lte: new Date(fromDate) };
                }
                if (userId) {
                    if (filter['fromDate']) {
                        filter = { $and: [{ createdAt: filter['fromDate'] }, { 'user.id': userId }] };
                    }
                    else {
                        filter['user.id'] = userId;
                    }
                }
                const publications = yield this._publicationService.findPublications(filter);
                return this._publicationService.map(lodash_1.map(publications, pub => pub.toJSON()), true);
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    like(request, publicationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = request;
            try {
                return this._publicationService.like(publicationId, user);
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    unlike(request, publicationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = request;
            try {
                return this._publicationService.unlike(publicationId, user);
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.CREATED, type: publication_vm_model_1.PublicationVm }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(publication_model_1.Publication.modelName, 'Create')),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, publication_params_model_1.PublicationParams]),
    __metadata("design:returntype", Promise)
], PublicationController.prototype, "create", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, type: publication_vm_model_1.PublicationVm, isArray: true }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(publication_model_1.Publication.modelName, 'GetAll')),
    swagger_1.ApiImplicitQuery({ name: 'fromDate', required: false }),
    swagger_1.ApiImplicitQuery({ name: 'userId', required: false }),
    __param(0, common_1.Query('fromDate')),
    __param(1, common_1.Query('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PublicationController.prototype, "get", null);
__decorate([
    common_1.Put(':id/like'),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.CREATED, type: publication_vm_model_1.PublicationVm }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(publication_model_1.Publication.modelName, 'Like')),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PublicationController.prototype, "like", null);
__decorate([
    common_1.Put(':id/unlike'),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.CREATED, type: publication_vm_model_1.PublicationVm }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(publication_model_1.Publication.modelName, 'Unlike')),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PublicationController.prototype, "unlike", null);
PublicationController = __decorate([
    common_1.Controller('publications'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiUseTags(publication_model_1.Publication.modelName),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [publication_service_1.PublicationService])
], PublicationController);
exports.PublicationController = PublicationController;
//# sourceMappingURL=publication.controller.js.map