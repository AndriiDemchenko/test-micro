import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Survey } from './survey.entity';
import { SurveyAnswerStatus } from '../surveys.interface';

@Entity()
export class SurveyAnswer {
  @PrimaryGeneratedColumn({ type: 'integer', unsigned: true })
  id: number;

  @Column()
  ownerId: number;

  @Column({ enum: SurveyAnswerStatus, default: SurveyAnswerStatus.Active })
  status: SurveyAnswerStatus;

  @ManyToOne(() => Survey, { cascade: true })
  @JoinColumn()
  survey: Survey;

  @Column({ array: true, type: 'text' })
  answers: string[];

  constructor(entity: Partial<SurveyAnswer>) {
    Object.assign(this, entity);
  }
}
