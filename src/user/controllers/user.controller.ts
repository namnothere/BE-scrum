import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
