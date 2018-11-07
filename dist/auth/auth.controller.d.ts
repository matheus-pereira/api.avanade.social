import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginUserDto, ValidateTokenDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    loginUser(res: any, loginUserDTO: LoginUserDto): Promise<any>;
    createUser(res: any, createUserDTO: CreateUserDto): Promise<any>;
    validateToken(res: any, validateTokenDTO: ValidateTokenDto): Promise<any>;
}
