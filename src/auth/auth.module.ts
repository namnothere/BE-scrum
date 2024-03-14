import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/entities';
import * as controllers from './controllers';
import * as providers from './providers';
import * as strategies from './strategies';
import { PassportModule } from '@nestjs/passport';
import { STRATEGY_JWT_AUTH } from './constants';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: STRATEGY_JWT_AUTH }),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        publicKey: configService.get<string>('jwt.secret'),
        privateKey: configService.get<string>('jwt.refreshSecret'),
        signOptions: { expiresIn: configService.get<string>('jwt.expiresIn') },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: Object.values(controllers),
  providers: [...Object.values(providers), ...Object.values(strategies)],
  exports: Object.values(providers),
})
export class AuthModule {}
