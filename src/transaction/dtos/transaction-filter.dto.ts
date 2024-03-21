import { PaginationParamsDto } from '../../shared/dtos';
import { IsOptional, IsString } from 'class-validator';

export class TransactionFilter extends PaginationParamsDto {
  @IsOptional()
  @IsString()
  keyword: string;
}
