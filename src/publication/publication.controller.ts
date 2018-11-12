import { Controller, Post, HttpStatus, Delete, Get, Put, Param, Body, HttpException, Query, UseGuards, Req } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ApiException } from 'src/shared/api-exception.model';
import { GetOperationId } from 'src/shared/utilities/get-operation-id';
import { AuthGuard } from '@nestjs/passport';
import { Publication } from './models/publication.model';
import { PublicationService } from './publication.service';
import { PublicationVm } from './models/view-models/publication-vm.model';
import { PublicationParams } from './models/view-models/publication-params.model';
import { map } from 'lodash';
import { IsDate } from 'src/shared/utilities/is-date';
import { User } from 'src/user/models/user.model';

@Controller('publications')
@UseGuards(AuthGuard('jwt'))
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

        const user = request.user as User;

        try {
            const newPublication = await this._publicationService.createPublication(user, text, imagePath);
            return this._publicationService.map<Publication>(newPublication);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
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
                    filter = { $and: [{ createdAt: filter['fromDate'] }, { 'user.id': userId }] }
                } else {
                    filter['user.id'] = userId;
                }
            }

            const publications = await this._publicationService.findPublications(filter);
            return this._publicationService.map<PublicationVm[]>(map(publications, pub => pub.toJSON()), true);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id/like')
    @ApiResponse({ status: HttpStatus.CREATED, type: PublicationVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(Publication.modelName, 'Like'))
    async like(@Req() request, @Param('id') publicationId: string): Promise<PublicationVm> {
        const { user } = request;

        try {
            return this._publicationService.like(publicationId, user);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id/unlike')
    @ApiResponse({ status: HttpStatus.CREATED, type: PublicationVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(Publication.modelName, 'Unlike'))
    async unlike(@Req() request, @Param('id') publicationId: string): Promise<PublicationVm> {
        const { user } = request;

        try {
            return this._publicationService.unlike(publicationId, user);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
