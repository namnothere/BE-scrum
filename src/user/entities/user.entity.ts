import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

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

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
