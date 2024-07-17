import { IsString, MaxLength, MinLength } from 'class-validator';
import { USER_PASSWORD_MIN_LEN, USER_PASSWORD_MAX_LEN } from '../auth.config';

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(USER_PASSWORD_MIN_LEN)
  @MaxLength(USER_PASSWORD_MAX_LEN)
  password: string;
}
