import { UserRepositoryPort } from '@modules/user/database/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserPrincipal } from '../../interface-adapters/interfaces/auth/user-principal.interface';
import { UserToken } from '../../interface-adapters/interfaces/auth/user-token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepositoryPort,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserPrincipal | null> {
    const user = await this.userRepo.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password.value))) {
      return {
        id: user.id.value,
        username: user.username.value,
        roles: ['ADMIN'],
      };
    }
    return null;
  }

  login(user: UserPrincipal | undefined): string {
    if (!user) {
      throw new Error();
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
