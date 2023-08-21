import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitCardsService } from './visit-cards.service';
import { VisitCardsController } from './visit-cards.controller';
import { VisitCard } from './entities/visit-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VisitCard])],
  controllers: [VisitCardsController],
  providers: [VisitCardsService],
})
export class VisitCardsModule {}
