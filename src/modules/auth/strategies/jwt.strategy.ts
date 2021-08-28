import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPrincipal } from '../../../interface-adapters/interfaces/auth/user-principal.interface';
import { UserToken } from '../../../interface-adapters/interfaces/auth/user-token.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('AUTH_JWT_SECRET'),
    });
  }

  validate(payload: UserToken): UserPrincipal {
    return { id: payload.id, username: payload.username, roles: payload.roles };
  }
}
