import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitCardsService } from './visit-cards.service';
import { VisitCardsController } from './visit-cards.controller';
import { VisitCard } from './entities/visit-card.entity';
import { User } from '../users/entities/user.entity';
import { Group } from '../groups/entities/group.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([VisitCard, User, Group])],
  controllers: [VisitCardsController],
  providers: [
    VisitCardsService,
    {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  ],
})
export class VisitCardsModule {}
