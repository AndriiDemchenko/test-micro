import { IsArray, IsString } from 'class-validator';

export class SaveAnswersDto {
  @IsArray()
  @IsString({ each: true })
  answers: string[];
}
