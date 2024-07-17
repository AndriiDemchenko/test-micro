import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { SurveyStatus } from '../conflicts.interface';

@Entity()
export class Conflict {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  surveyId: number;

  @Column()
  answerId: number;

  @Column({
    enum: SurveyStatus,
    default: SurveyStatus.Active,
  })
  status: SurveyStatus;

  @Column({
    array: true,
    type: 'text',
  })
  conflicts: string[];

  constructor(entity: Partial<Conflict>) {
    Object.assign(this, entity);
  }
}
