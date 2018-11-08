import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser} from './interfaces/iusers.interface';
import { IUsersService } from './interfaces/iusers.service';
import { debug } from 'console';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements IUsersService {
    private readonly saltRounds = 10;

    constructor(@InjectModel('User') private readonly userModel: Model<IUser>){
    }

    async findAll():Promise<IUser[]>{
        return await this.userModel.find().exec();
    }

    async findById(ID:string):Promise<IUser>{
        return await this.userModel.findById(ID).exec();
    }

    async findOne(options: Object):Promise<IUser>{
        return await this.userModel.findOne(options).exec();
    }

    async create(createUserDto: CreateUserDto):Promise<IUser>{
        const createdUser = new this.userModel(createUserDto);
        createdUser.password = await this.getHash(createdUser.password);
        return await createdUser.save();
    }

    async update(ID:string, newValue: CreateUserDto):Promise<IUser>{
        const user = await this.userModel.findById(ID).exec();

        if(!user.id){
            debug('user not found');
        }

        await this.userModel.findByIdAndUpdate(ID,newValue).exec();
        return await this.userModel.findById(ID).exec();
    }

    async delete(ID:string):Promise<string>{
        try {
            await this.userModel.findByIdAndRemove(ID).exec();
        } catch (error) {
            debug(error);
            return 'The user could not be deleted.'
        }
    }

    async getHash(password: string):Promise<string>{
        return bcrypt.hash(password,this.saltRounds);
    }

    async compareHash(password:string, hash:string):Promise<boolean>{
        return bcrypt.compare(password,hash);
    }

}
