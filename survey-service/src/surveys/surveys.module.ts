import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { SurveyAnswer } from './entities/survey-answer.entity';
import { ConflictModule } from 'src/conflicts/conflicts.module';
import { AuthModule } from 'src/auth/auth.module';
import { SurveysAnswersService } from './surveys-answers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey, SurveyAnswer]),
    ConflictModule,
    AuthModule,
  ],
  controllers: [SurveysController],
  providers: [SurveysService, SurveysAnswersService],
})
export class SurveysModule {}
