import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CredentialDto } from './user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findAll(): Promise<User[]> {
    return this.find();
  }

  async findById(id: string): Promise<User> {
    return this.findOneBy({ id });
  }

  async findOneForSignIn(email: string): Promise<User | null> {
    return this.findOne({
      where: {
        email,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOneBy({ email });
  }

  async insertOne(credentialDto: CredentialDto): Promise<User> {
    const user = this.create(credentialDto);

    await this.save(user);
    return user;
  }

  async deleteById(id: number): Promise<void> {
    await this.delete(id);
  }
}
