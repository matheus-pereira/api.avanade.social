import { Controller, Post, Body, Response, HttpStatus, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { LoginUserDto, ValidateTokenDto } from './dto/auth.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService, private readonly userService: UsersService) { }

    @Post('login')
    @ApiResponse({ status: 200, description: 'Authentication successfull.' })
    @ApiResponse({ status: 401, description: 'Forbidden.' })
    @ApiResponse({ status: 403, description: 'Wrong combination of email and password.' })
    async loginUser(@Response() res, @Body() loginUserDTO : LoginUserDto) {
        if (!(loginUserDTO && loginUserDTO.email && loginUserDTO.password)) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'Email and password are required!' });
        }
        const user = await this.userService.findOne({ email: loginUserDTO.email });
        if (user) {
            if (await this.userService.compareHash(loginUserDTO.password, user.password)) {
                return res.status(HttpStatus.OK).json(await this.authService.createToken(user.email, user.name));
            }
        }
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Wrong combination of email and password.' });
    }

    @Post('validateToken')
    @ApiResponse({ status: 200, description: 'Authentication successfull.' })
    @ApiResponse({ status: 403, description: 'Wrong combination of email and password.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async validateToken(@Response() res, @Body() validateTokenDTO: ValidateTokenDto){
        let token = validateTokenDTO.token;
        if(!token){
            return res.status(HttpStatus.UNAUTHORIZED).json({message: 'No token provided.'})
        }
        this.authService.validateToken(token).then( user => {
            return res.status(HttpStatus.OK).json(user)
        }).catch( err => {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
        });
    }
}
