import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities';

@Entity({ name: 'expense', schema: process.env.DB_SCHEMA })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'amount', default: 0 })
  amount: number;

  @ManyToMany(() => User, (User) => User.transactionFrom)
  from: User;

  @ManyToOne(() => User, (User) => User.transactionTo)
  to: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial: Partial<Transaction>) {
    Object.assign(this, partial);
  }
}
