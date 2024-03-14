import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService, JwtAuthGuard } from '../../auth';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { BaseApiResponse } from '../../shared/dtos';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {

  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('getInfo')
  getUserInfo(@ReqContext() ctx: RequestContext): Promise<BaseApiResponse<any>> {
    console.log(ctx);
    return this.authService.getUserInfo(ctx.user.id);
  }
}
