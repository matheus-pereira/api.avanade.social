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
const user_model_1 = require("./models/user.model");
const user_service_1 = require("./user.service");
const register_vm_model_1 = require("./models/view-models/register-vm.model");
const login_response_vm_model_1 = require("./models/view-models/login-response-vm.model");
const login_vm_model_1 = require("./models/view-models/login-vm.model");
const passport_1 = require("@nestjs/passport");
const api_exception_model_1 = require("../shared/api-exception.model");
const get_operation_id_1 = require("../shared/utilities/get-operation-id");
let UserController = class UserController {
    constructor(_userService) {
        this._userService = _userService;
    }
    register(registerVm) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = registerVm;
            if (!email) {
                throw new common_1.HttpException('Username is required.', common_1.HttpStatus.BAD_REQUEST);
            }
            if (!password) {
                throw new common_1.HttpException('Password is required.', common_1.HttpStatus.BAD_REQUEST);
            }
            let exist;
            try {
                exist = yield this._userService.findOne({ email });
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (exist) {
                throw new common_1.HttpException(`${email} exists`, common_1.HttpStatus.BAD_REQUEST);
            }
            return this._userService.register(registerVm);
        });
    }
    login(loginVm) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = Object.keys(loginVm);
            fields.forEach(field => {
                if (!loginVm[field]) {
                    throw new common_1.HttpException(`${field} is required`, common_1.HttpStatus.BAD_REQUEST);
                }
            });
            return this._userService.login(loginVm);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._userService.findById(id);
                if (!user) {
                    throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
                }
                const userVm = yield this._userService.map(user.toJSON());
                return userVm;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
__decorate([
    common_1.Post('register'),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.CREATED, type: login_response_vm_model_1.LoginResponseVm }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(user_model_1.User.modelName, 'Register')),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_vm_model_1.RegisterVm]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    common_1.Post('login'),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.CREATED, type: login_response_vm_model_1.LoginResponseVm }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(user_model_1.User.modelName, 'Login')),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_vm_model_1.LoginVm]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.CREATED, type: login_response_vm_model_1.LoginResponseVm }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(user_model_1.User.modelName, 'Get')),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
UserController = __decorate([
    common_1.Controller('users'),
    swagger_1.ApiUseTags(user_model_1.User.modelName),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map