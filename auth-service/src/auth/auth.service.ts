import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_TOKEN_SALT_ROUNDS } from './auth.config';
import { GRcpValidateJwt, JwtPayload } from './auth.interface';
import { ValidateJwtDto } from './dto/validate-jwt.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Username or password is invalid');
    }

    const { id: userId, password: hashedPassword } = user;

    const isPasswordSame = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordSame) {
      throw new UnauthorizedException('Username or password is invalid');
    }

    const payload: JwtPayload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }

  async register(registerDto: RegisterDto) {
    const { username, password } = registerDto;

    const isUsernameTaken =
      await this.usersService.checkIsUsernameTaken(username);

    if (isUsernameTaken) {
      throw new UnauthorizedException('Username already taken');
    }

    const hashedPassword = await bcrypt.hash(
      password,
      ACCESS_TOKEN_SALT_ROUNDS,
    );

    const userResult = await this.usersService.create({
      username,
      password: hashedPassword,
    });

    const userId = userResult.identifiers[0].id as number;
    const payload: JwtPayload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      id: userId,
      username,
      accessToken,
    };
  }

  async validateJwt(validateIwtDto: ValidateJwtDto): Promise<GRcpValidateJwt> {
    const { jwt } = validateIwtDto;

    let isValid = true;

    const payload: JwtPayload = await this.jwtService
      .verifyAsync(jwt)
      .catch(() => {
        isValid = false;
      });

    return {
      isValid,
      userId: payload?.sub || null,
    };
  }
}
