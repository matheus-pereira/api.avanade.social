import { IUser } from './iusers.interface';
import { CreateUserDto } from '../dto/createUser.dto';
export interface IUsersService {
    findAll(): Promise<IUser[]>;
    findById(ID: string): Promise<IUser | null>;
    findOne(options: object): Promise<IUser | null>;
    create(user: CreateUserDto): Promise<IUser>;
    update(ID: string, newValue: IUser): Promise<IUser | null>;
    delete(ID: string): Promise<string>;
}
