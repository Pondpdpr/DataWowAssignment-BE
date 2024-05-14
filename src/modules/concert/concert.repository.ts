import { Injectable } from '@nestjs/common';
import { Concert } from 'src/entities/concert.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateConcertDto } from './concert.dto';

@Injectable()
export class ConcertRepository extends Repository<Concert> {
  constructor(private dataSource: DataSource) {
    super(Concert, dataSource.createEntityManager());
  }

  async createConcert(createConcertDto: CreateConcertDto): Promise<Concert> {
    const concert = this.create(createConcertDto);

    await this.save(concert);
    return concert;
  }

  async findAll(): Promise<Concert[]> {
    const result = await this.createQueryBuilder('c')
      .groupBy('c.id')
      .leftJoinAndSelect('c.reservations', 'r')
      .select([
        'c.id AS id',
        'c.name AS name',
        'c.limit AS limit',
        'c.description AS description',
      ])
      .addSelect('Count(r.id)', 'reserved')
      .getRawMany();
    return result;
  }

  async findById(id: string): Promise<Concert> {
    return this.findOneBy({ id });
  }

  async deleteById(id: string): Promise<void> {
    await this.softDelete(id);
  }
}
