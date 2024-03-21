import { Expose } from 'class-transformer';

export class UserInfoOutput {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  full_name: string;

  @Expose()
  phone: string;

  @Expose()
  gender: number;

  @Expose()
  balance: number;

  @Expose()
  role: string;
}
