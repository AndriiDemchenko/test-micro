import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { UserStatus } from '../users.interface';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    enum: UserStatus,
    default: UserStatus.Active,
  })
  status: UserStatus;

  constructor(entity: Partial<User>) {
    Object.assign(this, entity);
  }
}
