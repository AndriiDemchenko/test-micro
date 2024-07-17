import { IsArray, IsString, IsObject, IsOptional } from 'class-validator';
import { SurveyConflictRules } from '../surveys.interface';

export class CreateSurveyDto {
  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  questions: string[];

  @IsObject()
  @IsOptional()
  conflictRules?: SurveyConflictRules;
}
