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
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const auth_service_1 = require("../auth.service");
const configuration_service_1 = require("../../configuration/configuration.service");
const configuration_enum_1 = require("../../configuration/configuration.enum");
let JwtStrategyService = class JwtStrategyService extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor(_authService, _configurationService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configurationService.get(configuration_enum_1.Configuration.JWT_KEY)
        });
        this._authService = _authService;
        this._configurationService = _configurationService;
    }
    validate(payload, done) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._authService.validatePayload(payload);
            if (!user) {
                return done(new common_1.HttpException({}, common_1.HttpStatus.UNAUTHORIZED), false);
            }
            return done(null, user, payload.iat);
        });
    }
};
JwtStrategyService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        configuration_service_1.ConfigurationService])
], JwtStrategyService);
exports.JwtStrategyService = JwtStrategyService;
//# sourceMappingURL=jwt-strategy.service.js.map