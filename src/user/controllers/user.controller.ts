import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
