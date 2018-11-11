import { Test, TestingModule } from '@nestjs/testing';
import { PublicationController } from './publication.controller';

describe('Publication Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [PublicationController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: PublicationController = module.get<PublicationController>(PublicationController);
    expect(controller).toBeDefined();
  });
});
