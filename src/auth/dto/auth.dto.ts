import { ApiModelProperty } from '@nestjs/swagger';

export class LoginUserDto {

    @ApiModelProperty()
    email: string;

    @ApiModelProperty()
    password: string;

}

export class ValidateTokenDto {
    
    @ApiModelProperty()
    readonly token: string;
}