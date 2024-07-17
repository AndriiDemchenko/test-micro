import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { SaveAnswersDto } from './dto/save-answers.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SurveysAnswersService } from './surveys-answers.service';

@Controller('surveys')
@UseGuards(AuthGuard)
export class SurveysController {
  constructor(
    private readonly surveysService: SurveysService,
    private readonly surveysAnswersService: SurveysAnswersService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveysService.findOne(+id);
  }

  @Post()
  create(@Req() req, @Body() createSurveyDto: CreateSurveyDto) {
    return this.surveysService.create(createSurveyDto, req.user.id);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.surveysService.remove({ id: +id, userId: req.user.id });
  }

  @Get(':id/questions')
  getQuestions(@Param('id') id: string) {
    return this.surveysService.getQuestions(+id);
  }

  @Post(':id/answers')
  saveAnswers(
    @Req() req,
    @Param('id') id: string,
    @Body() saveAnswersDto: SaveAnswersDto,
  ) {
    return this.surveysAnswersService.saveAnswers({
      id: +id,
      saveAnswersDto,
      userId: req.user.id,
    });
  }
}
