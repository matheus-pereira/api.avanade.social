import { Model } from 'mongoose';
import { IUser } from './interfaces/iusers.interface';
import { IUsersService } from './interfaces/iusers.service';
import { CreateUserDto } from './dto/createUser.dto';
export declare class UsersService implements IUsersService {
    private readonly userModel;
    private readonly saltRounds;
    constructor(userModel: Model<IUser>);
    findAll(): Promise<IUser[]>;
    findById(ID: string): Promise<IUser>;
    findOne(options: Object): Promise<IUser>;
    create(createUserDto: CreateUserDto): Promise<IUser>;
    update(ID: string, newValue: IUser): Promise<IUser>;
    delete(ID: string): Promise<string>;
    getHash(password: string): Promise<string>;
    compareHash(password: string, hash: string): Promise<boolean>;
}
