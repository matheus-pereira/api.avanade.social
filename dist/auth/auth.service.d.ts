import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly userService;
    private secretKey;
    constructor(userService: UsersService);
    createToken(email: string): Promise<{
        expires_in: number;
        token: string;
    }>;
    validateUser(email: string): Promise<boolean>;
    validateToken(token: string): Promise<string | object>;
}
