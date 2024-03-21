import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { JwtAuthAdminGuard } from '../../auth';
import { BasePaginationResponse } from '../../shared/dtos';
import { TransactionService } from '../providers';
import { TransactionFilter, TransactionOutput } from '../dtos';

@Controller('admin/transaction')
@UseGuards(JwtAuthAdminGuard)
export class TransactionAdminController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('filter')
  getTransactions(@Query() input: TransactionFilter): Promise<BasePaginationResponse<TransactionOutput>> {
    return this.transactionService.getTransactions(input);
  }
}
