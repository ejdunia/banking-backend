import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
// import Joi from 'joi';

const typeOrmModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Halcon9...',
  database: 'tiqpay',
  synchronize: true,
  autoLoadEntities: true,
});

@Module({
  imports: [
    typeOrmModule,
    TransactionsModule,
    UsersModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
