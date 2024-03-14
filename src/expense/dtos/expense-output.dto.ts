import { Expose, Type } from 'class-transformer';

export class ExpenseOutput {
  @Expose()
  id: number;

  @Expose()
  user: any;

  @Expose()
  description: string;

  @Expose()
  category: string;

  @Expose()
  @Type(() => Number)
  money: number;

  @Expose()
  @Type(() => Number)
  status: number;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
