import { Injectable, Logger } from '@nestjs/common';
import { Concert } from 'src/entities/concert.entity';
import { CreateConcertDto } from './concert.dto';
import { ConcertRepository } from './concert.repository';

@Injectable()
export class ConcertService {
  private logger = new Logger(ConcertService.name);

  constructor(private readonly concertRepository: ConcertRepository) {}

  async createConcert(createConcertDto: CreateConcertDto): Promise<Concert> {
    try {
      console.log(createConcertDto);
      const insertResult =
        await this.concertRepository.insert(createConcertDto);

      console.log(insertResult);
      if (insertResult.generatedMaps.length == 0) {
        throw new Error(`ConcertService.insertOne: ${insertResult.raw}`);
      }

      return this.concertRepository.findOneBy({
        id: insertResult.identifiers[0].id,
      });
    } catch (error) {
      console.log(error);
      this.logger.log(
        `ConcertService:createConcert: ${JSON.stringify(error.message)}`,
      );
    }
  }
}
