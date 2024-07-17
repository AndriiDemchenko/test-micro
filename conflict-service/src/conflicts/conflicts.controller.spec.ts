import { Test, TestingModule } from '@nestjs/testing';
import { ConflictsController } from './conflicts.controller';
import { ConflictsService } from './conflicts.service';

describe('ConflictsController', () => {
  let controller: ConflictsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConflictsController],
      providers: [ConflictsService],
    }).compile();

    controller = module.get<ConflictsController>(ConflictsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
