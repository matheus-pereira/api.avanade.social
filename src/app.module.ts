import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UserSchema } from './users/schemas/users.schema';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://avanade:avanade@mongodb-ejmu6.azure.mongodb.net/development', { useNewUrlParser: true }),
    PassportModule,
    UsersModule,
    AuthModule,
    PostsModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
