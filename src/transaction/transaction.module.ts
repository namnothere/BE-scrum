import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities';
import { Transaction } from './entities';
import * as providers from './providers';
import * as controllers from './controllers';
import { Expense } from '../expense/entities';
@Module({
  imports: [TypeOrmModule.forFeature([User, Transaction, Expense])],
  providers: Object.values(providers),
  controllers: Object.values(controllers),
  exports: Object.values(providers),
})
export class TransactionModule {}
