import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { SurveyConflictRules, SurveyStatus } from '../surveys.interface';

@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerId: number;

  @Column({
    enum: SurveyStatus,
    default: SurveyStatus.Active,
  })
  status: SurveyStatus;

  @Column({
    array: true,
    type: 'text',
  })
  questions: string[];

  @Column({
    nullable: true,
    type: 'json',
  })
  conflictRules?: SurveyConflictRules;

  constructor(entity: Partial<Survey>) {
    Object.assign(this, entity);
  }
}
