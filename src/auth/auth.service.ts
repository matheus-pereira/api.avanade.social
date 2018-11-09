import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken';
import { enviroment } from 'src/enviroment';

@Injectable()
export class AuthService {

    private secretKey = enviroment.secretKey;

    constructor(private readonly userService: UsersService) { }

    async createToken(email: string, name: string) {
        const expiresIn = 60 * 60;
        const user = { email, name };
        const token = jwt.sign({ user }, this.secretKey, { expiresIn });
        return { expires_in: expiresIn, token };
    }

    async validateUser(email: string) {
        return this.userService.findOne({ email });
    }

    async validateToken(token) {
        return jwt.verify(token, this.secretKey);
    }

}
