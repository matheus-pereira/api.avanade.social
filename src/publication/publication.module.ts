import { Module } from '@nestjs/common';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { Publication } from './models/publication.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Publication.modelName, schema: Publication.model.schema }])],
  controllers: [PublicationController],
  providers: [PublicationService, UserService]
})
export class PublicationModule {}
