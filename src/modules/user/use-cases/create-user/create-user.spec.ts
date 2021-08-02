import { UserRepositoryPort } from '@modules/user/database/user.repository.interface';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { CreateUserCommand } from '@modules/user/use-cases/create-user/create-user.command';
import { CreateUserService } from '@modules/user/use-cases/create-user/create-user.service';
import { Test } from '@nestjs/testing';
import faker from 'faker';
import { anyString, spy, when } from 'ts-mockito';
import { ID } from '../../../../core/value-objects/id.value-object';

describe('CreateUser', () => {
  let createUserService: CreateUserService;
  let userRepo: UserRepositoryPort;
  const createUserCommand = new CreateUserCommand({
    email: faker.internet.email(),
    address: {
      country: faker.address.country(),
      postalCode: faker.address.zipCode(),
      street: faker.address.streetName(),
    },
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: UserRepositoryPort,
          useValue: {
            exists: async () => false,
            save: async (user: UserEntity) => user,
          },
        },
      ],
    }).compile();

    createUserService = moduleRef.get(CreateUserService);
    userRepo = moduleRef.get(UserRepositoryPort);
  });

  describe('createUser', () => {
    it('should return id of user when successfully performed', async () => {
      const id = await createUserService.createUser(createUserCommand);
      expect(id).toBeInstanceOf(ID);
      expect(id.value).toBeDefined();
    });

    it('should throw error when email is already registered', async () => {
      when(spy(userRepo).exists(anyString())).thenResolve(true);
      await expect(
        createUserService.createUser(createUserCommand),
      ).rejects.toThrow();
    });
  });
});
