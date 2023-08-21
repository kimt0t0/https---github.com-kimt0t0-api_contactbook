import { Test, TestingModule } from '@nestjs/testing';
import { VisitCardsService } from './visit-cards.service';

describe('VisitCardsService', () => {
  let service: VisitCardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitCardsService],
    }).compile();

    service = module.get<VisitCardsService>(VisitCardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
