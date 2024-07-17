import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SaveAnswersDto } from './dto/save-answers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from './entities/survey.entity';
import { SurveyAnswer } from './entities/survey-answer.entity';
import { checkAnswer } from './surveys.helpers';
import { ConflictService } from 'src/conflicts/conflicts.service';

@Injectable()
export class SurveysAnswersService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,

    @InjectRepository(SurveyAnswer)
    private readonly surveyAnswerRepository: Repository<SurveyAnswer>,

    @Inject(ConflictService)
    private readonly conflictService: ConflictService,
  ) {}

  async saveAnswers({
    id,
    saveAnswersDto,
    userId,
  }: {
    id: number;
    saveAnswersDto: SaveAnswersDto;
    userId: number;
  }) {
    const { answers } = saveAnswersDto;

    const survey = await this.surveyRepository.findOne({ where: { id } });

    if (!survey) {
      throw new NotFoundException('Survey is not found');
    }

    const { conflictRules = {} } = survey;

    let isConflict = false;

    const conflicts = [];

    for (const conflictRuleId in conflictRules) {
      const { eq, ne } = conflictRules[conflictRuleId];
      const answer = answers[conflictRuleId];
      const rule = eq ?? ne;
      const result = checkAnswer({ rule, answer, answers });

      const isConflictedResult = (eq && result) || (ne && !result);

      if (!isConflictedResult) {
        continue;
      }

      isConflict = true;

      conflicts.push(
        `Answer "${answer}" is ${ne ? 'not ' : ''} equal to ${typeof rule === 'string' ? `"${rule}"` : `answer with ID ${rule}`}`,
      );
    }

    const answerResult = await this.surveyAnswerRepository.insert({
      survey: new Survey({ id }),
      answers,
      ownerId: userId,
    });

    let conflictId: number | null = null;

    if (isConflict) {
      const conflictResponse = await this.conflictService.create({
        answerId: answerResult.raw[0].id as number,
        surveyId: id,
        conflicts,
      });

      conflictId = conflictResponse.id;
    }

    return {
      isConflict,
      conflictId,
    };
  }
}
