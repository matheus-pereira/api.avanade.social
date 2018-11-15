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
const bcryptjs_1 = require("bcryptjs");
const user_model_1 = require("./models/user.model");
const auth_service_1 = require("../shared/auth/auth.service");
const base_service_1 = require("../shared/base.service");
const mapper_service_1 = require("../shared/mapper/mapper.service");
let UserService = class UserService extends base_service_1.BaseService {
    constructor(_userModel, _mapperService, _authService) {
        super();
        this._userModel = _userModel;
        this._mapperService = _mapperService;
        this._authService = _authService;
        this._model = _userModel;
        this._mapper = _mapperService.mapper;
        ;
    }
    register(registerVm) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, firstName, lastName } = registerVm;
            const newUser = new this._model();
            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.avatar = 'https://storage.googleapis.com/avanade-social/users/deafult_avatar.jpg';
            const salt = yield bcryptjs_1.genSalt(10);
            newUser.password = yield bcryptjs_1.hash(password, salt);
            try {
                const user = yield this.create(newUser);
                const payload = {
                    id: user.id,
                    email: user.email,
                    avatar: user.avatar,
                    name: user.fullName
                };
                const token = yield this._authService.signPayload(payload);
                const userVm = yield this.map(user.toJSON());
                return {
                    token,
                    user: userVm
                };
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    login(loginVm) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginVm;
            const user = yield this.findOne({ email });
            if (!user) {
                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.BAD_REQUEST);
            }
            const isMatch = yield bcryptjs_1.compare(password, user.password);
            if (!isMatch) {
                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.BAD_REQUEST);
            }
            const payload = {
                id: user.id,
                email: user.email,
                avatar: user.avatar,
                name: user.fullName
            };
            const token = yield this._authService.signPayload(payload);
            const userVm = yield this.map(user.toJSON());
            return {
                token,
                user: userVm
            };
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_model_1.User.modelName)),
    __param(2, common_1.Inject(common_1.forwardRef(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [Object, mapper_service_1.MapperService,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map