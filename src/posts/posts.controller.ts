import { Controller, Get, Response, HttpStatus, Param, Body, Post, Headers, Patch, Delete, UseGuards, Put, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/createPost.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@ApiUseTags('posts')
@Controller('posts')
export class PostsController {

    constructor(private readonly postsService:PostsService){}

    @Get()
    public async getPosts(@Response() res){
        const users = await this.postsService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('find')
    public async findPost(@Response() res, @Body() body) {
        const queryCondition = body;
        const posts = await this.postsService.findOne(queryCondition);
        return res.status(HttpStatus.OK).json(posts);
    }

    @Get('/:id')
    public async getPost(@Response() res, @Param() param){
        const post = await this.postsService.findById(param.id);
        return res.status(HttpStatus.OK).json(post);
    }

    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createPost(@Response() res, @Body() createPostDTO: CreatePostDto) {
        const post = await this.postsService.create(createPostDTO);
        return res.status(HttpStatus.OK).json(post);
    }

    @Patch('/:id')
    public async updatePost(@Param() param, @Response() res, @Body() body) {
        const post = await this.postsService.update(param.id, body);
        return res.status(HttpStatus.OK).json(post);
    }

    @Delete('/:id')
    public async deletePost(@Param() param, @Response() res) {
        const post = await this.postsService.delete(param.id);
        return res.status(HttpStatus.OK).json(post);
    }

    @Put('/:id/like')
    public async likePost(@Param() param, @Response() res, @Req() req){
        const user = req.user;
        const post = await this.postsService.likePost(param.id,user);
        return res.status(HttpStatus.OK).json(post);
    }

    @Put('/:id/unlike')
    public async unlikePost(@Param() param, @Response() res, @Req() req){
        const user = req.user;
        const post = await this.postsService.unlikePost(param.id,user.id);
        return res.status(HttpStatus.OK).json(post);
    }
}