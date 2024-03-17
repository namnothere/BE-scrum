import { Expose, Type } from 'class-transformer';
import { UserInfoOutput } from '../../user/dtos';

export class ExpenseOutput {
  @Expose()
  id: number;

  @Expose()
  user: UserInfoOutput;

  @Expose()
  description: string;

  @Expose()
  category: string;

  @Expose()
  @Type(() => Number)
  amount: number;

  @Expose()
  @Type(() => Number)
  status: number;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
