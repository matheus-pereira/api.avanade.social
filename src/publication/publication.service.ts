import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Publication } from './models/publication.model';
import { BaseService } from '../shared/base.service';
import { UserService } from '../user/user.service';
import { MapperService } from '../shared/mapper/mapper.service';
import { ModelType } from 'typegoose';
import { User } from '../user/models/user.model';
import { UserResumeVm } from '../user/models/view-models/user-resume-vm.model';

@Injectable()
export class PublicationService extends BaseService<Publication> {
    constructor(
        @InjectModel(Publication.modelName) private readonly _publicationModel: ModelType<Publication>,
        private readonly _userService: UserService,
        private readonly _mapperService: MapperService
    ) {
        super();
        this._model = _publicationModel;
        this._mapper = _mapperService.mapper;
    }

    async createPublication(user: User, text: string, imagePath?: string): Promise<Publication> {
        const newPublication = new this._model();

        newPublication.user = new UserResumeVm();
        newPublication.user.id = user.id;
        newPublication.user.name = user.fullName;
        newPublication.user.avatar = user.avatar;

        newPublication.text = text;

        if (imagePath) {
            newPublication.imagePath = imagePath;
        }

        try {
            const result = await this.create(newPublication);
            return result.toJSON() as Publication;
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findPublications(filter) {
        return this._model.find(filter).limit(10).sort({ createdAt: -1 }).exec();
    }

    async like(publicationId: string, user: User): Promise<Publication> {
        try {
            let publication = await this.findById(publicationId);

            let newLike = new UserResumeVm();
            newLike.id = user.id;
            newLike.name = user.fullName;

            const index = publication.likes.findIndex(like => like.id == newLike.id);
            if (index < 0) {
                publication.likes.push(newLike);
                publication = await await this.update(publicationId, publication);
            }
            
            return publication;
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async unlike(publicationId: string, user: User): Promise<Publication> {
        try {
            let publication = await this.findById(publicationId);

            let like = new UserResumeVm();
            like.id = user.id;
            like.name = user.fullName;

            const index = publication.likes.findIndex(oldLike => oldLike.id == like.id);
            if (index !== -1) {
                publication.likes.splice(index, 1);
                publication = await this.update(publicationId, publication);
            }
            
            return publication;
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
