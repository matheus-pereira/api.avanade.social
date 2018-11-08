import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/users.schema';

describe('Users Controller', () => {
  let app: TestingModule;
  
  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [MongooseModule.forRoot('mongodb://localhost/avanade'),
      MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
      controllers: [UsersController],
      providers: [UsersService]
    }).compile();
  });

  it('should be defined', () => {
    const controller: UsersController = app.get<UsersController>(UsersController);
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
  })
});
