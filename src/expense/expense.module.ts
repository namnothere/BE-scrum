import { Module } from '@nestjs/common';
import * as providers from './providers';
import * as controllers from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities';
import { Expense } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Expense])],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
  exports: Object.values(providers),
})
export class ExpenseModule {}
