import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import * as controllers from './controllers';
import * as providers from './providers';
import { AuthModule } from '../auth';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class UserModule {}
