import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

    private secretKey = '6787225D3AF59F9954E9E6AST349CCF81F6352E7A8A4455EA27941C76593FA25';

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
