import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/posts.schema';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [ MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
  PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
