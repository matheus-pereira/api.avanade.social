import { Injectable } from '@nestjs/common';
import { IPostService } from './interfaces/iposts.service';
import { InjectModel } from '@nestjs/mongoose';
import { IPost } from './interfaces/iposts.interface';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/createPost.dto';
import { debug } from 'util';

@Injectable()
export class PostsService implements IPostService {
   
    
        constructor(@InjectModel('Post') private readonly postModel: Model<IPost>){
        }
    
        async findAll():Promise<IPost[]>{
            return await this.postModel.find().exec();
        }
    
        async findById(ID:string):Promise<IPost>{
            return await this.postModel.findById(ID).exec();
        }
    
        async findOne(options: Object):Promise<IPost>{
            return await this.postModel.findOne(options).exec();
        }
    
        async create(createPostDTO: CreatePostDto):Promise<IPost>{
            const createdUser = new this.postModel(createPostDTO);
            return await createdUser.save();
        }
    
        async update(ID:string, newValue: CreatePostDto):Promise<IPost>{
            const user = await this.postModel.findById(ID).exec();
    
            if(!user.id){
                debug('post not found');
            }
    
            await this.postModel.findByIdAndUpdate(ID,newValue).exec();
            return await this.postModel.findById(ID).exec();
        }
    
        async delete(ID:string):Promise<string>{
            try {
                await this.postModel.findByIdAndRemove(ID).exec();
            } catch (error) {
                return 'The post could not be deleted.'
            }
        }

        async likePost(ID:string,user:{id:string, name:string}){
            const post = await this.postModel.findById(ID).exec();
            let index = post.likes.findIndex( like => like.id == user.id);
            console.log('index',index);
            if(index < 0){
                post.likes.push({id: user.id, name: user.name});
                return post.save();
            }else{
                return 'User already liked the post.';
            }
        }

        async unlikePost(ID:string, userID: string){
            const post = await this.postModel.findById(ID).exec();
            console.log('post',post);
            console.log('userid',userID);
            let index = post.likes.findIndex( like => like.id == userID);
            if(index >= 0){
                post.likes.splice(index,1);
                return post.save();
            }else{
                return 'The user could not be found.';
            }
        }
      
}
