import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';

import { MapperService } from 'src/shared/mapper/mapper.service';
import { BaseService } from 'src/shared/base.service';
import { Publication } from './models/publication.model';
import { UserResumeVm } from 'src/user/models/view-models/user-resume-vm.model';

@Injectable()
export class PublicationService extends BaseService<Publication> {
    constructor(
        @InjectModel(Publication.modelName) private readonly _publicationModel: ModelType<Publication>,
        private readonly _mapperService: MapperService
    ) {
        super();
        this._model = _publicationModel;
        this._mapper = _mapperService.mapper;
    }

    async createPublication(user: UserResumeVm, text: string, imagePath?: string): Promise<Publication> {
        const newPublication = new this._model();

        newPublication.user = user;
        newPublication.text = text;

        if (imagePath) {
            newPublication.imagePath = imagePath;
        }

        try {
            const result = await this._publicationModel.create(newPublication);
            return result.toJSON() as Publication;
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findPublications(filter) {
        console.log(filter)
        return this._model.find(filter).limit(10).sort({ createdAt: -1 }).exec();
    }
}