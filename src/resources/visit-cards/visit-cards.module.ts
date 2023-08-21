import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitCardsService } from './visit-cards.service';
import { VisitCardsController } from './visit-cards.controller';
import { VisitCard } from './entities/visit-card.entity';
import { User } from '../users/entities/user.entity';
import { Group } from '../groups/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VisitCard, User, Group])],
  controllers: [VisitCardsController],
  providers: [VisitCardsService],
})
export class VisitCardsModule {}
