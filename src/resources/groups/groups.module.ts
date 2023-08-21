import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group } from './entities/group.entity';
import { User } from '../users/entities/user.entity';
import { VisitCard } from '../visit-cards/entities/visit-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User, VisitCard])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
