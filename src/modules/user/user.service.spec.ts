import { Test, TestingModule } from '@nestjs/testing';
import { User, UserRole } from '../../entities/user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn(),
            findByEmail: jest.fn(),
            insertOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should return user when success', async () => {
      const newUserInfo = {
        name: 'newUser',
        password: 'password',
        email: 'newUser@email.com',
      };
      const expectedNewUser = {
        id: 'id',
        name: 'newUser',
        email: 'newUser@email.com',
        role: UserRole.USER,
      };
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      jest
        .spyOn(repository, 'insertOne')
        .mockResolvedValueOnce(expectedNewUser as User);

      const newUser = await service.create(newUserInfo);

      expect(repository.insertOne).toHaveBeenCalledWith(newUserInfo);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: newUserInfo.email },
      });
      expect(newUser).toEqual(expectedNewUser);
    });

    it('should return admin when provide admin role and success', async () => {
      const newUserInfo = {
        name: 'newUser',
        password: 'password',
        email: 'newUser@email.com',
        role: UserRole.ADMIN,
      };
      const expectedNewUser = {
        id: 'id',
        name: 'newUser',
        email: 'newUser@email.com',
        role: UserRole.ADMIN,
      };
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      jest
        .spyOn(repository, 'insertOne')
        .mockResolvedValueOnce(expectedNewUser as User);

      const newUser = await service.create(newUserInfo);

      expect(repository.insertOne).toHaveBeenCalledWith(newUserInfo);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: newUserInfo.email },
      });
      expect(newUser).toEqual(expectedNewUser);
    });

    it('should return null when there is existing user with the same email', async () => {
      const newUserInfo = {
        name: 'newUser',
        password: 'password',
        email: 'existingUser@email.com',
      };
      const existingUser = {
        id: 'id',
        name: 'existingUser',
        email: 'existingUser@email.com',
        role: UserRole.ADMIN,
      };
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(existingUser);

      const newUser = await service.create(newUserInfo);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: newUserInfo.email },
      });
      expect(newUser).toEqual(null);
    });
  });

  describe('findByEmailForAuth', () => {
    it('should return user when success', async () => {
      const userEmail = 'user@email.com';
      const expectedExistingUser = {
        id: 'id',
        name: 'User',
        email: 'user@email.com',
        role: UserRole.USER,
      };
      jest
        .spyOn(repository, 'findByEmail')
        .mockResolvedValueOnce(expectedExistingUser);

      const existingUser = await service.findByEmailForAuth(userEmail);

      expect(repository.findByEmail).toHaveBeenCalledWith(userEmail);
      expect(existingUser).toEqual(expectedExistingUser);
    });

    it('should return error when user dont exist', async () => {
      const userEmail = 'user@email.com';
      jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce(null);

      const existingUser = await service.findByEmailForAuth(userEmail);
      expect(repository.findByEmail).toHaveBeenCalledWith(userEmail);
      expect(existingUser).toEqual(null);
    });
  });
});
