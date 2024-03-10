import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {
  // GraphQL logging uses the apollo plugins.
  // https://docs.nestjs.com/graphql/plugins
  // https://docs.nestjs.com/graphql/field-middleware

  constructor(private readonly logger: PinoLogger) {}

  public use(req: Request, _res: Response, next: () => void): void {
    // const authorization = req.header('authorization');

    // const user = authorization.startsWith('Bearer') ? this.auth.getPayload(authorization.split(' ')[1]) : req.user;
    const user = req.user;
    // Add extra fields to share in logger context
    this.logger.assign({ user });

    next();
  }
}
