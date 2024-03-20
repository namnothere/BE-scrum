import { Controller, UseGuards, Get, Param, Post } from '@nestjs/common';
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

  @Get('filter')
  getAllExpense(): Promise<BaseApiResponse<any>> {
    return this.expenseAdminService.getAllExpense();
  }

  @Post('approve/:id')
  approveExpense(@ReqContext() ctx: RequestContext, @Param('id') expenseId: string): Promise<BaseApiResponse<any>> {
    return this.expenseAdminService.approveExpense(ctx.user.id, expenseId);
  }

  @Post('reject/:id')
  rejectExpense(@Param('id') expenseId: string): Promise<BaseApiResponse<any>> {
    return this.expenseAdminService.rejectExpense(expenseId);
  }
}
