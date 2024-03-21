import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ILike, In, Not, Repository } from 'typeorm';
import { User } from '../../user/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { EXPENSE_STATUS, Expense } from '../entities';
import { MESSAGES, RESULT_STATUS } from '../../shared/constants';
import { plainToInstance } from 'class-transformer';
import { ExpenseOutput, FilterExpense } from '../dtos';
import { BasePaginationResponse } from '../../shared/dtos';
import { TransactionService } from '../../transaction/providers';

@Injectable()
export class ExpenseAdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Expense)
    private readonly expenseRepo: Repository<Expense>,
    private readonly transactionService: TransactionService,
  ) {}

  async getAllExpense(input: FilterExpense): Promise<BasePaginationResponse<ExpenseOutput>> {
    const where = {};

    if (input.category) {
      where['category'] = ILike(`%${input.category}%`);
    }

    if (input.keyword) {
      where['user'] = {
        username: ILike(`%${input.keyword}%`),
      };
      where['description'] = ILike(`%${input.keyword}%`);
    }

    if (typeof input.status == 'number') {
      where['status'] = input.status;
    }

    const [expense, count] = await this.expenseRepo.findAndCount({
      where: where,
      relations: {
        user: true,
      },
      take: input.limit,
      skip: input.offset,
    });
    const output = plainToInstance(ExpenseOutput, expense, {
      excludeExtraneousValues: true,
    });

    return {
      listData: output,
      total: count,
    };
  }

  async approveExpense(userId: string, id: string) {
    const expense = await this.expenseRepo.findOne({
      relations: ['user'],
      where: {
        id,
        status: Not(In([EXPENSE_STATUS.APPROVED_BY_FD, EXPENSE_STATUS.REJECTED])),
      },
    });

    if (!expense) {
      throw new NotFoundException(MESSAGES.NOT_FOUND_EXPENSE);
    }

    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(MESSAGES.NOT_FOUND_USER);
    }

    if (user.role === 'MANAGER') {
      if (expense.status != EXPENSE_STATUS.NEW_REQUEST) throw new BadRequestException(MESSAGES.NOT_NEW_REQUEST);

      await this.expenseRepo.update(id, {
        status: EXPENSE_STATUS.APPROVED_BY_MANAGER,
      });
    }

    if (user.role === 'FD') {
      if (expense.status != EXPENSE_STATUS.APPROVED_BY_MANAGER) throw new BadRequestException(MESSAGES.NOT_YET_APPROVED_BY_MANAGER);

      const transaction = await this.transactionService.createTransferMoney(user.id, {
        expenseId: id,
        amount: expense.amount,
      });

      await this.expenseRepo.update(id, {
        status: EXPENSE_STATUS.APPROVED_BY_FD,
      });

      if (!transaction) throw new BadRequestException(MESSAGES.CREATE_TRANSACTION_FAILED);
    }

    return {
      status: RESULT_STATUS.SUCCEED,
      error: false,
      data: null,
      code: 0,
      message: MESSAGES.OK,
    };
  }

  async rejectExpense(id: string, input: { note: string }) {
    const expense = await this.expenseRepo.findOne({
      where: {
        id,
        status: Not(In([EXPENSE_STATUS.APPROVED_BY_FD, EXPENSE_STATUS.REJECTED])),
      },
    });

    if (!expense) {
      throw new NotFoundException(MESSAGES.NOT_FOUND_EXPENSE);
    }

    await this.expenseRepo.update(id, {
      status: EXPENSE_STATUS.REJECTED,
      note: input.note,
    });

    return {
      status: RESULT_STATUS.SUCCEED,
      error: false,
      data: null,
      code: 0,
      message: MESSAGES.OK,
    };
  }
}
