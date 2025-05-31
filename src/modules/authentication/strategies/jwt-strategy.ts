import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthenticationRepository } from '../authentication.repository';
import { Authentication } from '../entities/authentication.entity';
import { UserState } from '../enums/user-state.enum';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authRepo: AuthenticationRepository,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Authentication> {
    const { id } = payload;

    const user = await this.authRepo.findOneBy({ id });

    if (!user) {
      throw new UnauthorizedException('Token not valid');
    }

    if (user.state !== UserState.ACTIVE) {
      throw new UnauthorizedException('User is not active');
    }

    return user;
  }
}
