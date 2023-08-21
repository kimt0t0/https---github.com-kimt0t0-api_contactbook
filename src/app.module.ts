import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { VisitCardsModule } from './resources/visit-cards/visit-cards.module';
import { UsersModule } from './resources/users/users.module';
import { GroupsModule } from './resources/groups/groups.module';

@Module({
  imports: [
    UsersModule,
    VisitCardsModule,
    GroupsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: 'root', // using .env did not work, did not have time to debug
      password: '',
      database: 'contactbook_db',
      autoLoadEntities: true,
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
