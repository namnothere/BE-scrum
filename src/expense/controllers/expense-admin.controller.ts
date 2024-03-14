import { Controller, UseGuards, Get, Patch, Body } from '@nestjs/common';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { JwtAuthAdminGuard } from '../../auth';
import { BaseApiResponse } from '../../shared/dtos';
import { ExpenseAdminService } from '../providers';

@Controller('admin/expense')
@UseGuards(JwtAuthAdminGuard)
export class ExpenseAdminController {
  constructor(private readonly expenseAdminService: ExpenseAdminService) {}

  @Get()
  adminEndpoint(@ReqContext() ctx: RequestContext) {
    return 'admin endpoint' + ctx.user.id;
  }

  @Get('all')
  getAllExpense(): Promise<BaseApiResponse<any>> {
    return this.expenseAdminService.getAllExpense();
  }

  @Patch('approve')
  approveExpense(@ReqContext() ctx: RequestContext, @Body() expenseId: string): Promise<BaseApiResponse<any>> {
    return this.expenseAdminService.approveExpense(ctx.user.id, expenseId);
  }

  @Patch('reject')
  rejectExpense(@Body() expenseId: string): Promise<BaseApiResponse<any>> {
    return this.expenseAdminService.rejectExpense(expenseId);
  }
}
