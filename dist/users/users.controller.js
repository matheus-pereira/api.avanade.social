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
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const createUser_dto_1 = require("./dto/createUser.dto");
const passport_1 = require("@nestjs/passport");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getUsers(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.usersService.findAll();
            return res.status(common_1.HttpStatus.OK).json(users);
        });
    }
    findUser(res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryCondition = body;
            const users = yield this.usersService.findOne(queryCondition);
            return res.status(common_1.HttpStatus.OK).json(users);
        });
    }
    getUser(res, param) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.usersService.findById(param.id);
            return res.status(common_1.HttpStatus.OK).json(users);
        });
    }
    createUser(res, createUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.create(createUserDTO);
            return res.status(common_1.HttpStatus.OK).json(user);
        });
    }
    updateUser(param, res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.update(param.id, body);
            return res.status(common_1.HttpStatus.OK).json(user);
        });
    }
    deleteUser(param, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.delete(param.id);
            return res.status(common_1.HttpStatus.OK).json(user);
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    common_1.Get('find'),
    __param(0, common_1.Response()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findUser", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Response()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiResponse({ status: 201, description: 'The record has been successfully created.' }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    __param(0, common_1.Response()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    common_1.Patch('/:id'),
    __param(0, common_1.Param()), __param(1, common_1.Response()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.Param()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
UsersController = __decorate([
    common_1.UseGuards(passport_1.AuthGuard()),
    swagger_1.ApiUseTags('users'),
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map