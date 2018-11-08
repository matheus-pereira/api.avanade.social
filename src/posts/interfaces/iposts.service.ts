import {IPost} from './iposts.interface';
import { CreatePostDto } from '../dto/createPost.dto';

export interface IPostService {
    findAll(): Promise<IPost[]>;
    findById(ID: string): Promise<IPost | null>;
    findOne(options: object): Promise<IPost | null>;
    create(user: CreatePostDto): Promise<IPost>;
    update(ID: string, newValue: IPost): Promise<IPost | null>;
    delete(ID: string): Promise<string>;
}