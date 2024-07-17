import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  GRcpAuthService,
  ValidateJwtRequest,
  ValidateJwtResponse,
} from './auth.interface';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: GRcpAuthService;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<GRcpAuthService>('AuthService');
  }

  validateJwt(
    validateJwtRequest: ValidateJwtRequest,
  ): Promise<ValidateJwtResponse> {
    return firstValueFrom(this.authService.validateJwt(validateJwtRequest));
  }
}
