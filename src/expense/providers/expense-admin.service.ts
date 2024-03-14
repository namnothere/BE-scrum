import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../user/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from '../entities';
import { MESSAGES } from '../../shared/constants';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Expense)
    private readonly expenseRepo: Repository<Expense>,
  ) {}

  async approveExpense(userId: string, id: string) {
    const expense = await this.expenseRepo.findOne({
      where: {
        id,
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
  }
}
