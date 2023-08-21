import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Group } from '../groups/entities/group.entity';
import { VisitCard } from '../visit-cards/entities/visit-card.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group, VisitCard])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  ],
})
export class UsersModule {}
