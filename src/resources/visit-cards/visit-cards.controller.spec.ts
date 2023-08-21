import { Test, TestingModule } from '@nestjs/testing';
import { VisitCardsController } from './visit-cards.controller';
import { VisitCardsService } from './visit-cards.service';

describe('VisitCardsController', () => {
  let controller: VisitCardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitCardsController],
      providers: [VisitCardsService],
    }).compile();

    controller = module.get<VisitCardsController>(VisitCardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
