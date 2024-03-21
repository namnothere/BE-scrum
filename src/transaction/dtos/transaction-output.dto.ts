import { Expose, Type } from 'class-transformer';
import { UserInfoOutput } from '../../user/dtos';
import { ExpenseOutput } from '../../expense/dtos';

export class TransactionOutput {
  @Expose()
  id: number;

  @Expose()
  @Type(() => UserInfoOutput)
  from: UserInfoOutput;

  @Expose()
  @Type(() => ExpenseOutput)
  expense: ExpenseOutput;

  @Expose()
  @Type(() => Number)
  amount: number;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
