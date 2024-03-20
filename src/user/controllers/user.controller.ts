import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { BaseApiResponse } from '../../shared/dtos';
import { UserService } from '../providers';
import { UserInfoUpdateInput } from '../dtos/user-infor-update-input.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getInfo')
  getUserInfo(@ReqContext() ctx: RequestContext): Promise<BaseApiResponse<any>> {
    return this.userService.getUserInfo(ctx.user.id);
  }

  @Put('updateInfo')
  updateUserInfo(@ReqContext() ctx: RequestContext, @Body() input: UserInfoUpdateInput): Promise<BaseApiResponse<any>> {
    return this.userService.updateUserInfo(ctx.user.id, input);
  }
}
