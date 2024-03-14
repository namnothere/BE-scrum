import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { User } from '../../user/entities';
import { Repository } from 'typeorm';

import { MESSAGES, RESULT_STATUS } from '../../shared/constants';
import { BaseApiResponse } from '../../shared/dtos';
import type { JwtPayload, JwtSign, Payload } from '../auth.interface';
import { AuthTokenOutput, RegisterInput, RegisterOutput, UserAccessTokenClaims } from '../dtos';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public async validateUser(username: string, password: string): Promise<UserAccessTokenClaims> {
    // const user = await this.user.fetch(username);
    const user = await this.userRepo.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      throw new ForbiddenException({
        message: MESSAGES.NOT_FOUND_USER,
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new ForbiddenException({
        message: MESSAGES.LOGIN_INCORRECT,
      });
    }

    return plainToClass(UserAccessTokenClaims, user, {
      excludeExtraneousValues: true,
    });
  }

  public validateRefreshToken(data: Payload, refreshToken: string): boolean {
    if (!this.jwtService.verify(refreshToken, { secret: this.configService.get('jwtRefreshSecret') })) {
      return false;
    }

    const payload = this.jwtService.decode<{ sub: string }>(refreshToken);
    return payload.sub === data.userId;
  }

  public jwtSign(data: Payload): JwtSign {
    const payload: JwtPayload = { sub: data.userId, username: data.username, role: data.role };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.getRefreshToken(payload.sub),
    };
  }

  public getPayload(token: string): Payload | null {
    try {
      const payload = this.jwtService.decode<JwtPayload | null>(token);
      if (!payload) {
        return null;
      }

      return { userId: payload.sub, username: payload.username, role: payload.role };
    } catch {
      // Unexpected token i in JSON at position XX
      return null;
    }
  }

  async login(userId: string): Promise<BaseApiResponse<AuthTokenOutput>> {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new UnauthorizedException();

    const subject = { sub: user.id };
    const payload = {
      username: user.username,
      sub: user.id,
    };

    const authToken = {
      refreshToken: this.jwtService.sign(subject, {
        expiresIn: this.configService.get('jwt.expiresIn'),
      }),
      token: this.jwtService.sign({ ...payload, ...subject }, { expiresIn: this.configService.get('jwt.expiresIn') }),
      user,
    };

    await this.userRepo.update({ id: user.id }, { token: authToken.token });

    const output = plainToClass(
      AuthTokenOutput,
      {
        ...authToken,
        user,
      },
      { excludeExtraneousValues: true },
    );
    return {
      status: RESULT_STATUS.SUCCEED,
      error: false,
      data: output,
      code: 0,
      // message: MESSAGES.OK,
    };
  }

  private getRefreshToken(sub: string): string {
    return this.jwtService.sign(
      { sub },
      {
        secret: this.configService.get('jwtRefreshSecret'),
        expiresIn: '7d', // Set greater than the expiresIn of the access_token
      },
    );
  }

  async registerUser(input: RegisterInput): Promise<BaseApiResponse<any>> {
    const findUserName = await this.userRepo.findOne({
      where: { username: input.username },
    });
    if (findUserName) {
      throw new ForbiddenException(MESSAGES.USERNAME_ALREADY_EXIST);
    }

    const user = new User({
      ...input,
      // role: role,
      password: await bcrypt.hash(input.password, 10),
      // verification_code: makeId(6),
      // verification_time: Date.now() + convertMilliseconds(VERIFICATION_TIME),
    });
    await this.userRepo.save(user);

    const output = plainToClass(RegisterOutput, user, {
      excludeExtraneousValues: true,
    });

    return {
      status: RESULT_STATUS.SUCCEED,
      error: false,
      data: output,
      code: 0,
      message: MESSAGES.OK,
    };
  }

  async findByToken(token: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { token },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    // try {
    //   this.jwtService.verify(token);
    // } catch (e) {
    //   console.log(e);
    //   throw new UnauthorizedException();
    // }
    return user;
  }
}
