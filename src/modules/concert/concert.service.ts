import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
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
      const concert =
        await this.concertRepository.createConcert(createConcertDto);

      return concert;
    } catch (error) {
      console.log(error);
      this.logger.log(
        `ConcertService:createConcert: ${JSON.stringify(error.message)}`,
      );
    }
  }

  async deleteConcert(concertId: string): Promise<Concert> {
    try {
      const drug = await this.concertRepository.findById(concertId);
      if (!drug) {
        throw new HttpException('Concert not exists', HttpStatus.BAD_REQUEST);
      }
      await this.concertRepository.deleteById(concertId);
      return drug;
    } catch (error) {
      this.logger.log(
        `BottleService:deleteBottle: ${JSON.stringify(error.message)}`,
      );
      throw new BadRequestException(error.message);
    }
  }
}
