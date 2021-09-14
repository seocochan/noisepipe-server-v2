import { UserRepositoryPort } from '@modules/user/database/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { UserPrincipal } from '../../interface-adapters/interfaces/auth/user-principal.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UserRepositoryPort) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserPrincipal | null> {
    const user = await this.userRepo.findOneByUsername(username);
    if (user && user.password.match(password)) {
      return {
        id: user.id.value,
        username: user.username.value,
        roles: user.roles.map((it) => it.name),
      };
    }
    return null;
  }
}
