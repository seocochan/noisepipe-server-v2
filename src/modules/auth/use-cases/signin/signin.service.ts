import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPrincipal } from '../../../../interface-adapters/interfaces/auth/user-principal.interface';
import { UserToken } from '../../../../interface-adapters/interfaces/auth/user-token.interface';

@Injectable()
export class SigninService {
  constructor(private readonly jwtService: JwtService) {}

  login(user: UserPrincipal | undefined): string {
    if (!user) {
      throw new Error('Signin failed');
    }
    const payload: UserToken = {
      sub: user.id,
      id: user.id,
      username: user.username,
      roles: user.roles,
    };
    return this.jwtService.sign(payload);
  }
}
