import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { MESSAGES, RESULT_STATUS } from '../../shared/constants';
import { Transaction } from '../entities';
import { TransferMoneyInput } from '../dtos/transfer-money-input.dto';
import { User } from '../../user/entities';
import { Expense } from '../../expense/entities';
import { plainToClass } from 'class-transformer';
import { TransactionFilter, TransactionOutput } from '../dtos';
import { BasePaginationResponse } from '../../shared/dtos';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Expense)
    private readonly expenseRepo: Repository<Expense>,
  ) {}

  async getTransactions(input: TransactionFilter): Promise<BasePaginationResponse<TransactionOutput>> {
    const [transactions, count] = await this.transactionRepo.findAndCount({
      relations: ['expense'],
      take: input.limit,
      skip: input.offset,
    });

    const output = plainToClass(TransactionOutput, transactions, {
      excludeExtraneousValues: true,
    });

    return {
      total: count,
      listData: output,
    };
  }

  async createTransferMoney(userId: string, input: TransferMoneyInput) {
    try {
      const expense = await this.expenseRepo.findOne({
        relations: ['user', 'transaction'],
        where: {
          id: input.expenseId,
        },
      });

      if (!expense) {
        throw new NotFoundException(MESSAGES.NOT_FOUND_EXPENSE);
      }

      const sender = await this.userRepo.findOne({
        where: {
          id: userId,
        },
      });

      if (!sender) {
        throw new NotFoundException(MESSAGES.NOT_FOUND_USER);
      }

      const receiver = await this.userRepo.findOne({
        where: {
          id: expense.user.id,
        },
      });

      if (!receiver) {
        throw new NotFoundException(MESSAGES.NOT_FOUND_USER);
      }
      if (sender.balance < input.amount) {
        throw new NotFoundException(MESSAGES.NOT_ENOUGH_BALANCE);
      }

      const newTransaction = this.transactionRepo.create({
        amount: input.amount,
        from: sender,
      });

      const transaction = await this.transactionRepo.save(newTransaction);
      await this.expenseRepo.update(expense.id, {
        transaction: transaction,
      });

      sender.balance = sender.balance - input.amount;
      receiver.balance = receiver.balance + input.amount;

      await this.userRepo.save(sender);
      await this.userRepo.save(receiver);

      const output = plainToClass(TransactionOutput, newTransaction, {
        excludeExtraneousValues: true,
      });

      return {
        data: output,
        status: RESULT_STATUS.SUCCEED,
      };
    } catch (error) {
      throw error;
    }
  }
}
