import { IsString } from 'class-validator';

export class ValidateJwtDto {
  @IsString()
  jwt: string;
}
