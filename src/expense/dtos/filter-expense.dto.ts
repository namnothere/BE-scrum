import { IsOptional, IsString } from 'class-validator';
import { PaginationParamsDto } from '../../shared/dtos';
import { Transform } from 'class-transformer';

export class FilterExpense extends PaginationParamsDto {
  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  keyword: string;

  @IsOptional()
  @Transform(({ value }) => Number(value) || null)
  status: number;
}
