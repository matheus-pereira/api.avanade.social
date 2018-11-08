import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(res: any): Promise<any>;
    findUser(res: any, body: any): Promise<any>;
    getUser(res: any, param: any): Promise<any>;
    createUser(res: any, createUserDTO: CreateUserDto): Promise<any>;
    updateUser(param: any, res: any, body: any): Promise<any>;
    deleteUser(param: any, res: any): Promise<any>;
}
