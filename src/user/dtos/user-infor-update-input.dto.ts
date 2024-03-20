import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UserInfoUpdateInput {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || null)
  full_name: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || null)
  phone: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || null)
  gender: number;
}
