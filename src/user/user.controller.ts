import { Controller, Post, HttpStatus, Body, HttpException } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

import { User } from './models/user.model';
import { UserService } from './user.service';
import { RegisterVm } from './models/view-models/register-vm.model';
import { UserVm } from './models/view-models/user-vm.model';
import { GetOperationId } from 'src/shared/utilities/get-operation-id';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { ApiException } from 'src/shared/api-exception.model';
import { LoginVm } from './models/view-models/login-vm.model';

@Controller('users')
@ApiUseTags(User.modelName)
export class UserController {
    constructor(private readonly _userService: UserService) { }

    @Post('register')
    @ApiResponse({ status: HttpStatus.CREATED, type: LoginResponseVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'Register'))
    async register(@Body() registerVm: RegisterVm): Promise<LoginResponseVm> {
        const { email, password } = registerVm;

        if (!email) {
            throw new HttpException('Username is required.', HttpStatus.BAD_REQUEST);
        }

        if (!password) {
            throw new HttpException('Password is required.', HttpStatus.BAD_REQUEST);
        }

        let exist;
        try {
            exist = await this._userService.findOne({ email });
        } catch(e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (exist) {
            throw new HttpException(`${email} exists`, HttpStatus.BAD_REQUEST);
        }

        return this._userService.register(registerVm);
    }

    @Post('login')
    @ApiResponse({ status: HttpStatus.CREATED, type: LoginResponseVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'Login'))
    async login(@Body() loginVm: LoginVm) {
        const fields = Object.keys(loginVm);
        fields.forEach(field => {
            if (!loginVm[field]) {
                throw new HttpException(`${field} is required`, HttpStatus.BAD_REQUEST);
            }
        });

        return this._userService.login(loginVm);
    }
}
