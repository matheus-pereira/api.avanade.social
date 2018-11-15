import { Injectable, HttpException, HttpStatus, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { genSalt, hash, compare } from 'bcryptjs';

import { User } from './models/user.model';
import { RegisterVm } from './models/view-models/register-vm.model';
import { LoginVm } from './models/view-models/login-vm.model';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { UserVm } from './models/view-models/user-vm.model';
import { AuthService } from '../shared/auth/auth.service';
import { JwtPayload } from '../shared/auth/jwt-payload';
import { BaseService } from '../shared/base.service';
import { MapperService } from '../shared/mapper/mapper.service';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectModel(User.modelName) private readonly _userModel: ModelType<User>,
        private readonly _mapperService: MapperService,
        @Inject(forwardRef(() => AuthService)) readonly _authService: AuthService
    ) {
        super();
        this._model = _userModel;
        this._mapper = _mapperService.mapper;;
    }

    async register(registerVm: RegisterVm): Promise<LoginResponseVm> {
        const { email, password, firstName, lastName } = registerVm;

        const newUser = new this._model();
        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.avatar = 'https://storage.googleapis.com/avanade-social/users/deafult_avatar.jpg';

        const salt = await genSalt(10);
        newUser.password = await hash(password, salt);

        try {
            const user = await this.create(newUser);

            const payload: JwtPayload = {
                id: user.id,
                email: user.email,
                avatar: user.avatar,
                name: user.fullName
            };
    
            const token = await this._authService.signPayload(payload);
            const userVm: UserVm = await this.map<UserVm>(user.toJSON());
            return {
                token,
                user: userVm
            };
        } catch(e) {
            // MongoError
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(loginVm: LoginVm): Promise<LoginResponseVm> {
        const { email, password } = loginVm;

        const user = await this.findOne({ email });
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
        }
        
        const payload: JwtPayload = {
            id: user.id,
            email: user.email,
            avatar: user.avatar,
            name: user.fullName
        };

        const token = await this._authService.signPayload(payload);
        const userVm: UserVm = await this.map<UserVm>(user.toJSON());
        return {
            token,
            user: userVm
        };
    }
}
