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
const auth_service_1 = require("./auth.service");
const users_service_1 = require("src/users/users.service");
const createUser_dto_1 = require("src/users/dto/createUser.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_dto_1 = require("./dto/auth.dto");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    loginUser(res, loginUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(loginUserDTO && loginUserDTO.email && loginUserDTO.password)) {
                return res.status(common_1.HttpStatus.FORBIDDEN).json({ message: 'Email and password are required!' });
            }
            const user = yield this.userService.findOne({ email: loginUserDTO.email });
            if (user) {
                if (yield this.userService.compareHash(loginUserDTO.password, user.password)) {
                    return res.status(common_1.HttpStatus.OK).json(yield this.authService.createToken(user.email));
                }
            }
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'Wrong combination of email and password.' });
        });
    }
    createUser(res, createUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.create(createUserDTO);
            return res.status(common_1.HttpStatus.OK).json(user);
        });
    }
    validateToken(res, validateTokenDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = validateTokenDTO.token;
            if (!token) {
                return res.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'No token provided.' });
            }
            this.authService.validateToken(token).then(user => {
                return res.status(common_1.HttpStatus.OK).json(user);
            }).catch(err => {
                return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(err);
            });
        });
    }
};
__decorate([
    common_1.Post('login'),
    swagger_1.ApiResponse({ status: 200, description: 'Authentication successfull.' }),
    swagger_1.ApiResponse({ status: 401, description: 'Forbidden.' }),
    swagger_1.ApiResponse({ status: 403, description: 'Wrong combination of email and password.' }),
    __param(0, common_1.Response()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    common_1.Post('register'),
    swagger_1.ApiResponse({ status: 201, description: 'The record has been successfully created.' }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    __param(0, common_1.Response()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createUser", null);
__decorate([
    common_1.Post('validateToken'),
    __param(0, common_1.Response()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.ValidateTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validateToken", null);
AuthController = __decorate([
    swagger_1.ApiUseTags('auth'),
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, users_service_1.UsersService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map