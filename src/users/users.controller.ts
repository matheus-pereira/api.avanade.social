import { Controller, Get, Response, HttpStatus, Param, Body, Post, Headers, Patch, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@ApiUseTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}

    @Get()
    public async getUsers(@Response() res){
        const users = await this.usersService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('find')
    public async findUser(@Response() res, @Body() body) {
        const queryCondition = body;
        const users = await this.usersService.findOne(queryCondition);
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('/:id')
    public async getUser(@Response() res, @Param() param){
        const users = await this.usersService.findById(param.id);
        return res.status(HttpStatus.OK).json(users);
    }

    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createUser(@Response() res, @Body() createUserDTO: CreateUserDto) {

        const user = await this.usersService.create(createUserDTO);
        return res.status(HttpStatus.OK).json(user);
    }

    @Patch('/:id')
    public async updateUser(@Param() param, @Response() res, @Body() body) {

        const user = await this.usersService.update(param.id, body);
        return res.status(HttpStatus.OK).json(user);
    }

    @Delete('/:id')
    public async deleteUser(@Param() param, @Response() res) {
        const user = await this.usersService.delete(param.id);
        return res.status(HttpStatus.OK).json(user);
    }
}
