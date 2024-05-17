import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });

      if (existingUser) return null;

      return await this.userRepository.insertOne(createUserDto);
    } catch (error) {
      this.logger.log(`UserService:create: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }

  async findByEmailForAuth(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findByEmail(email);
      return user;
    } catch (error) {
      this.logger.log(
        `UserService:findByUsername: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }
}
