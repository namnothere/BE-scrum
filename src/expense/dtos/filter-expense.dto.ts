import { IsOptional, IsString } from 'class-validator';
import { PaginationParamsDto } from '../../shared/dtos';

export class FilterExpense extends PaginationParamsDto {
  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  keyword: string;
}
