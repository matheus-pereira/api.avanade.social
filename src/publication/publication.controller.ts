import { Controller, Post, HttpStatus, Delete, Get, Put, Param, Body, HttpException, Query, UseGuards, Req } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ApiException } from 'src/shared/api-exception.model';
import { GetOperationId } from 'src/shared/utilities/get-operation-id';
import { AuthGuard } from '@nestjs/passport';
import { Publication } from './models/publication.model';
import { PublicationService } from './publication.service';
import { PublicationVm } from './models/view-models/publication-vm.model';
import { UserResumeVm } from 'src/user/models/view-models/user-resume-vm.model';
import { PublicationParams } from './models/view-models/publication-params.model';
import { map } from 'lodash';
import { Types } from 'mongoose';
import { IsDate } from 'src/shared/utilities/is-date';

@UseGuards(AuthGuard('jwt'))
@Controller('publications')
@ApiUseTags(Publication.modelName)
@ApiBearerAuth()
export class PublicationController {
    constructor(private readonly _publicationService: PublicationService) { }

    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, type: PublicationVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(Publication.modelName, 'Create'))
    async create(@Req() request, @Body() params: PublicationParams): Promise<PublicationVm> {
        const { text, imagePath } = params;

        if (!text) {
            throw new HttpException('Publication text is required', HttpStatus.BAD_REQUEST);
        }

        const user = new UserResumeVm();
        user.id = request.user._id;
        user.name = request.user.fullName;

        try {
            const newPublication = await this._publicationService.createPublication(user, text, imagePath);
            return this._publicationService.map<Publication>(newPublication);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: HttpStatus.OK, type: PublicationVm, isArray: true })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(Publication.modelName, 'GetAll'))
    @ApiImplicitQuery({ name: 'fromDate', required: false })
    @ApiImplicitQuery({ name: 'userId', required: false })
    async get(
        @Query('fromDate') fromDate?: string,
        @Query('userId') userId?: string
    ): Promise<PublicationVm[]> {
        try {
            let filter = {};

            if (fromDate) {
                if (!IsDate(fromDate)) {
                    throw new HttpException('Invalid date format', HttpStatus.BAD_REQUEST);
                }

                filter['createdAt'] = { $lte: new Date(fromDate) };
            }

            if (userId) {
                if (filter['fromDate']) {
                    filter = { $and: [{ createdAt: filter['fromDate'] }, { 'user.id': Types.ObjectId(userId) }] }
                } else {
                    filter['user.id'] = Types.ObjectId(userId);
                }
            }

            const publications = await this._publicationService.findPublications(filter);
            return this._publicationService.map<PublicationVm[]>(map(publications, pub => pub.toJSON()), true);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id/like')
    @UseGuards(AuthGuard('jwt'))
    async likePublication(@Req() request, @Param('id') publicationId: string): Promise<PublicationVm> {
        try {
            const user = { id: request.user.id, name: request.user.firstName };
            const result = await this._publicationService.likePublication(publicationId, user);
            return result
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id/unlike')
    @UseGuards(AuthGuard('jwt'))
    async unlikePublication(@Req() request, @Param('id') publicationId: string): Promise<PublicationVm> {
        try {
            const user = { id: request.user.id, name: request.user.firstName };
            const result = await this._publicationService.unlikePublication(publicationId, user);
            return result;
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @Put(':id/likes')
    // @UseGuards(AuthGuard('jwt'))
    // @ApiResponse({ status: HttpStatus.CREATED, type: TodoVm })
    // @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    // @ApiOperation(GetOperationId(Todo.modelName, 'Update'))
    // async update(@Body() vm: TodoVm): Promise<TodoVm> {
    //     const { id, content, level, isCompleted } = vm;

    //     if (!vm || !id) {
    //         throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    //     }

    //     let exist;
    //     try {
    //         exist = await this._todoService.findById(id);
    //     } catch (e) {
    //         throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }

    //     if (!exist) {
    //         throw new HttpException(`${id} Not found`, HttpStatus.NOT_FOUND);
    //     }

    //     if (exist.isCompleted) {
    //         throw new HttpException(`Already completed`, HttpStatus.BAD_REQUEST);
    //     }

    //     exist.content = content;
    //     exist.isCompleted = isCompleted;
    //     exist.level = level;
    //     try {
    //         const updated = await this._todoService.update(id, exist);
    //         return this._todoService.map<TodoVm>(updated.toJSON());
    //     } catch (e) {
    //         throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // @Delete(':id')
    // @UseGuards(AuthGuard('jwt'))
    // @ApiResponse({ status: HttpStatus.OK, type: TodoVm })
    // @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    // @ApiOperation(GetOperationId(Todo.modelName, 'Delete'))
    // async delete(@Param('id') id: string): Promise<TodoVm> {
    //     try {
    //         const deleted = await this._todoService.delete(id);
    //         return this._todoService.map<TodoVm>(deleted.toJSON());
    //     } catch (e) {
    //         throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
}
