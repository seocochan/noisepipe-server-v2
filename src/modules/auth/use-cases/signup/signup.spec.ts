import { ID } from '@core/value-objects/id.value-object';
import { SignupCommand } from '@modules/auth/use-cases/signup/signup.command';
import { SignupService } from '@modules/auth/use-cases/signup/signup.service';
import { UserRoleRepositoryPort } from '@modules/user/database/user-role.repository.interface';
import { UserRepositoryPort } from '@modules/user/database/user.repository.interface';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserRoleName } from '@modules/user/domain/enums/user-role-name.enum';
import { Test } from '@nestjs/testing';
import faker from 'faker';
import { anyString, spy, when } from 'ts-mockito';
import { IdResponse } from '../../../../interface-adapters/dtos/id.response.dto';

describe('Signup', () => {
  let signupService: SignupService;
  let userRepo: UserRepositoryPort;
  const signupCommand = new SignupCommand({
    username: faker.internet.userName(),
    password: faker.internet.password(10),
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SignupService,
        {
          provide: UserRepositoryPort,
          useValue: {
            exists: async () => false,
            save: async (user: UserEntity) => user,
          },
        },
        {
          provide: UserRoleRepositoryPort,
          useValue: {
            findOneByName: async (name: UserRoleName) => ({
              id: ID.generate(),
              name: UserRoleName.USER,
            }),
          },
        },
      ],
    }).compile();

    signupService = moduleRef.get(SignupService);
    userRepo = moduleRef.get(UserRepositoryPort);
  });

  describe('signup', () => {
    it('should return id of user when successfully performed', async () => {
      const idResponse = await signupService.signup(signupCommand);
      expect(idResponse).toBeInstanceOf(IdResponse);
      expect(idResponse.id).toBeDefined();
    });

    it('should throw error when email is already registered', async () => {
      when(spy(userRepo).exists(anyString())).thenResolve(true);
      await expect(signupService.signup(signupCommand)).rejects.toThrow();
    });
  });
});
