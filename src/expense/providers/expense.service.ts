import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseInput } from '../dtos';
import { Repository } from 'typeorm';
import { User } from '../../user/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from '../entities';
import { BaseApiResponse } from '../../shared/dtos';
import { ExpenseOutput } from '../dtos';
import { plainToClass } from 'class-transformer';
import { MESSAGES, RESULT_STATUS } from '../../shared/constants';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Expense)
    private readonly expenseRepo: Repository<Expense>,
  ) {}

  async create(userId: string, input: CreateExpenseInput): Promise<BaseApiResponse<ExpenseOutput>> {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
    });

    const newExpense = this.expenseRepo.create({
      user,
      ...input,
    });

    await this.expenseRepo.save(newExpense);
    const output = plainToClass(ExpenseOutput, newExpense, {
      excludeExtraneousValues: true,
    });

    return {
      data: output,
      status: RESULT_STATUS.SUCCEED,
    };
  }

  async remove(userId: string, id: string) {
    const expense = await this.expenseRepo.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });

    if (!expense) {
      throw new NotFoundException(MESSAGES.NOT_FOUND_EXPENSE);
    }

    await this.expenseRepo.remove(expense);

    return {
      status: RESULT_STATUS.SUCCEED,
    };
  }
}
