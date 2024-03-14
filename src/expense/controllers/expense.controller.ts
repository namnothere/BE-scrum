import { Controller, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ExpenseService } from '../providers/expense.service';
import { CreateExpenseInput } from '../dtos';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { JwtAuthGuard } from '../../auth';

@Controller('expense')
@UseGuards(JwtAuthGuard)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@ReqContext() ctx: RequestContext, @Body() createExpenseInput: CreateExpenseInput) {
    return this.expenseService.create(ctx.user.id, createExpenseInput);
  }

  @Delete(':id')
  remove(@ReqContext() ctx: RequestContext, @Param('id') id: string) {
    return this.expenseService.remove(ctx.user.id, id);
  }
}
