import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TransferMoneyInput {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  expenseId: string;
}
