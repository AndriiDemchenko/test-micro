import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorization = request?.headers?.authorization;

    if (!authorization || typeof authorization !== 'string') {
      return false;
    }

    const [authType, accessToken] = authorization.split(' ');

    if (authType !== 'Bearer' || !accessToken) {
      return false;
    }

    const { isValid, userId } = await this.authService.validateJwt({
      jwt: accessToken,
    });

    request.user = { id: userId };

    return isValid;
  }
}
