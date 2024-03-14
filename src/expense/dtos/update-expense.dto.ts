import { PartialType } from '@nestjs/swagger';
import { CreateExpenseInput } from './create-expense-input.dto';

export class UpdateExpenseDto extends PartialType(CreateExpenseInput) {}
