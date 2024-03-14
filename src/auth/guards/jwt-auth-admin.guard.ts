import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { STRATEGY_JWT_AUTH_ADMIN } from '../constants';
import { AuthService } from '../providers';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthAdminGuard extends AuthGuard(STRATEGY_JWT_AUTH_ADMIN) implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) return true;
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const http = context.switchToHttp();
    const { headers } = http.getRequest();

    if (!headers.authorization) {
      throw new UnauthorizedException();
    }
    const authorization = headers.authorization.replace('Bearer ', '');
    const user = await this.authService.findByToken(authorization);

    if (!user || user.role == 'USER') {
      throw new UnauthorizedException();
    }

    headers.user = user;
    return true;
  }
}
