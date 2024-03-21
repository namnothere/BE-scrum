import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities';
import { Transaction } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Transaction])]
})
export class ExpenseModule {}