import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import * as controllers from './controllers';
import * as providers from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class UserModule {}
