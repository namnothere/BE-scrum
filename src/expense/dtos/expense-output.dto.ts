import { Expose, Type } from 'class-transformer';
import { UserInfoOutput } from '../../user/dtos';

export class ExpenseOutput {
  @Expose()
  id: number;

  @Expose()
  @Type(() => UserInfoOutput)
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
  note: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
