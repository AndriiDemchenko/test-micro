import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { SurveyStatus } from './surveys.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from './entities/survey.entity';
import { validateConflictRules } from './surveys.helpers';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  async findOne(id: number) {
    const survey = await this.surveyRepository.findOne({
      where: {
        id,
        status: SurveyStatus.Active,
      },
    });

    if (!survey) {
      throw new NotFoundException('Survey is not found');
    }

    return survey;
  }

  async create(createSurveyDto: CreateSurveyDto, userId: number) {
    const { questions, conflictRules } = createSurveyDto;

    if (conflictRules) {
      validateConflictRules({ conflictRules, questions });
    }

    return this.surveyRepository.save({
      ...createSurveyDto,
      ownerId: userId,
    });
  }

  async remove({ id, userId }: { id: number; userId: number }) {
    const survey = await this.surveyRepository.findOne({
      where: { id, status: SurveyStatus.Active },
    });

    if (!survey) {
      throw new NotFoundException('Survey is not found');
    }

    if (survey.ownerId !== userId) {
      throw new ForbiddenException('You do not have permissions to delete it');
    }

    await this.surveyRepository.update(
      { id },
      { status: SurveyStatus.Removed },
    );

    return survey;
  }

  async getQuestions(id: number) {
    const survey = await this.surveyRepository.findOne({ where: { id } });

    if (!survey) {
      throw new NotFoundException('Survey is not found');
    }

    return survey.questions;
  }
}
