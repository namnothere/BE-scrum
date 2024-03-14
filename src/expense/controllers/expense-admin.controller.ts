import { Controller, UseGuards, Get } from '@nestjs/common';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { JwtAuthAdminGuard } from '../../auth';

@Controller('admin/expense')
@UseGuards(JwtAuthAdminGuard)
export class ExpenseAdminController {
  // constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  adminEndpoint(@ReqContext() ctx: RequestContext) {
    return 'admin endpoint' + ctx.user.id;
  }
}
