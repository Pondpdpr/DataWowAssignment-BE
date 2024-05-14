import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { Concert } from 'src/entities/concert.entity';
import { CreateConcertDto } from './concert.dto';
import { ConcertService } from './concert.service';

@Controller('concert')
export class ConcertController {
  private logger = new Logger(ConcertController.name);
  constructor(private readonly concertService: ConcertService) {}

  @Get()
  async getAllConcert(): Promise<Concert[]> {
    return this.concertService.getAllConcert();
  }

  @Post()
  async createConcert(
    @Body() createConcertDto: CreateConcertDto,
  ): Promise<Concert> {
    return this.concertService.createConcert(createConcertDto);
  }

  @Delete('/:id')
  async deleteConcert(@Param() param: any): Promise<Concert> {
    return this.concertService.deleteConcert(param.id);
  }
}
