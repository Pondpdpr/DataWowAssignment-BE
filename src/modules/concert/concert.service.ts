import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Concert } from '../../entities/concert.entity';
import { CreateConcertDto, StatDto } from './concert.dto';
import { ConcertRepository } from './concert.repository';

@Injectable()
export class ConcertService {
  private logger = new Logger(ConcertService.name);

  constructor(private readonly concertRepository: ConcertRepository) {}

  async getAllConcert(): Promise<Concert[]> {
    try {
      const concert = await this.concertRepository.findAll();

      return concert;
    } catch (error) {
      this.logger.log(
        `ConcertService:createConcert: ${JSON.stringify(error.message)}`,
      );
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createConcert(createConcertDto: CreateConcertDto): Promise<Concert> {
    try {
      const concert =
        await this.concertRepository.createConcert(createConcertDto);

      return concert;
    } catch (error) {
      this.logger.log(
        `ConcertService:createConcert: ${JSON.stringify(error.message)}`,
      );
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteConcert(concertId: string): Promise<Concert> {
    try {
      const concert = await this.concertRepository.findById(concertId);
      if (!concert) {
        throw new HttpException('Concert not exists', HttpStatus.BAD_REQUEST);
      }
      await this.concertRepository.deleteById(concertId);
      return concert;
    } catch (error) {
      this.logger.log(
        `ConcertService:deleteConcert: ${JSON.stringify(error.message)}`,
      );
      throw new BadRequestException(error.message);
    }
  }

  async getConcertStat(): Promise<StatDto> {
    try {
      const stat = await this.concertRepository.getStat();
      return stat;
    } catch (error) {
      this.logger.log(
        `ConcertService:getConcertStat: ${JSON.stringify(error.message)}`,
      );
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
