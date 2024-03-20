import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { In, Not, Repository } from 'typeorm';
import { User } from '../../user/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { EXPENSE_STATUS, Expense } from '../entities';
import { MESSAGES, RESULT_STATUS } from '../../shared/constants';
import { plainToInstance } from 'class-transformer';
import { ExpenseOutput } from '../dtos';

@Injectable()
export class ExpenseAdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Expense)
    private readonly expenseRepo: Repository<Expense>,
  ) {}

  async getAllExpense() {
    const expense = await this.expenseRepo.find();
    const output = plainToInstance(ExpenseOutput, expense, {
      excludeExtraneousValues: true,
    });

    return {
      status: RESULT_STATUS.SUCCEED,
      error: false,
      data: output,
      code: 0,
      message: MESSAGES.OK,
    };
  }

  async approveExpense(userId: string, id: string) {
    const expense = await this.expenseRepo.findOne({
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

      await this.expenseRepo.update(id, {
        status: EXPENSE_STATUS.APPROVED_BY_FD,
      });
    }

    return {
      status: RESULT_STATUS.SUCCEED,
      error: false,
      data: null,
      code: 0,
      message: MESSAGES.OK,
    };
  }

  async rejectExpense(id: string) {
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
