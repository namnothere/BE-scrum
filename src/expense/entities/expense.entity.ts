import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities';

export enum EXPENSE_STATUS {
  NEW_REQUEST = 0,
  APPROVED_BY_MANAGER = 1,
  APPROVED_BY_FD = 2,
  REJECTED = 3,
}

@Entity({ name: 'expense', schema: process.env.DB_SCHEMA })
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'amount', default: 0 })
  amount: number;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'category', nullable: true })
  category: string;

  @ManyToOne(() => User, (User) => User.expenses)
  user: User;

  @Column({ name: 'status', default: 0 })
  status: EXPENSE_STATUS;

  @Column({ name: 'note', nullable: true })
  note: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial: Partial<Expense>) {
    Object.assign(this, partial);
  }
}
