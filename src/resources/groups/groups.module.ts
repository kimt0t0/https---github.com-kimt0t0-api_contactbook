import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group } from './entities/group.entity';
import { User } from '../users/entities/user.entity';
import { VisitCard } from '../visit-cards/entities/visit-card.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User, VisitCard])],
  controllers: [GroupsController],
  providers: [
    GroupsService,
    {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  ],
})
export class GroupsModule {}
