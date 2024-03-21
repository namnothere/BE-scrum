import { Module } from '@nestjs/common';
import * as providers from './providers';
import * as controllers from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities';
import { Expense } from './entities';
import { TransactionService } from '../transaction/providers';
import { Transaction } from '../transaction/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Expense, Transaction])],
  controllers: Object.values(controllers),
  providers: [...Object.values(providers), TransactionService],
  exports: Object.values(providers),
})
export class ExpenseModule {}
