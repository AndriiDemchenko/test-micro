import { Body, Controller, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { GRcpValidateJwt } from './auth.interface';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ValidateJwtDto } from './dto/validate-jwt.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @GrpcMethod('AuthService', 'validateJwt')
  validateJwt(validateJwtDto: ValidateJwtDto): Promise<GRcpValidateJwt> {
    return this.authService.validateJwt(validateJwtDto);
  }
}
