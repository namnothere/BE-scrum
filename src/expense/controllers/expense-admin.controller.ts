import { Controller, UseGuards, Get, Param, Post, Body, Query } from '@nestjs/common';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { JwtAuthAdminGuard } from '../../auth';
import { BaseApiResponse, BasePaginationResponse } from '../../shared/dtos';
import { ExpenseAdminService } from '../providers';
import { ExpenseOutput, FilterExpense } from '../dtos';

@Controller('admin/expense')
@UseGuards(JwtAuthAdminGuard)
export class ExpenseAdminController {
  constructor(private readonly expenseAdminService: ExpenseAdminService) {}

  @Get()
  adminEndpoint(@ReqContext() ctx: RequestContext) {
    return 'admin endpoint' + ctx.user.id;
  }

  @Get('filter')
  getAllExpense(@Query() input: FilterExpense): Promise<BasePaginationResponse<ExpenseOutput>> {
    return this.expenseAdminService.getAllExpense(input);
  }

  @Post('approve/:id')
  approveExpense(@ReqContext() ctx: RequestContext, @Param('id') expenseId: string): Promise<BaseApiResponse<any>> {
    return this.expenseAdminService.approveExpense(ctx.user.id, expenseId);
  }

  @Post('reject/:id')
  rejectExpense(@Param('id') expenseId: string, @Body() input: { note: string }): Promise<BaseApiResponse<any>> {
    return this.expenseAdminService.rejectExpense(expenseId, input);
  }
}
