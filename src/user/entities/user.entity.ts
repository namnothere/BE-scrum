import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Expense } from '../../expense/entities';
import { Transaction } from '../../transaction/entities';

@Entity({ name: 'users', schema: process.env.DB_SCHEMA })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @Unique('username', ['username'])
  @Column({ length: 200 })
  username: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ nullable: true })
  phone: string;

  @Column('varchar', { default: 'USER' })
  role: string;

  @Column({ nullable: true })
  gender: number;

  @CreateDateColumn({ name: 'createdAt', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', nullable: false })
  updatedAt: Date;

  @Column({ nullable: true })
  token: string;

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];

  @OneToMany(() => Transaction, (transaction) => transaction.from)
  transactions: Transaction[];

  @Column({ nullable: false, default: 0 })
  balance: number;

  @Column({ nullable: true })
  avatar_url: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
