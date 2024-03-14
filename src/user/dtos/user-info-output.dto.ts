import { Expose } from 'class-transformer';

export class UserInfoOutput {
  @Expose()
  id: number;

  @Expose()
  full_name: string;

  @Expose()
  phone: string;

  @Expose()
  gender: number;

  @Expose()
  role: string;
}
