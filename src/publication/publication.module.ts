import { Module } from '@nestjs/common';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { Publication } from './models/publication.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Publication.modelName, schema: Publication.model.schema }])],
  controllers: [PublicationController],
  providers: [PublicationService]
})
export class PublicationModule {}
