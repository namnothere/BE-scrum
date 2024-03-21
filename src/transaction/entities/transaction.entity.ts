import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities';
import { Expense } from '../../expense/entities';

@Entity({ name: 'transaction', schema: process.env.DB_SCHEMA })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'amount', default: 0 })
  amount: number;

  @ManyToOne(() => User, (User) => User.transactions)
  from: User;

  @OneToOne(() => Expense, (expense) => expense.transaction)
  expense: Expense;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial: Partial<Transaction>) {
    Object.assign(this, partial);
  }
}
