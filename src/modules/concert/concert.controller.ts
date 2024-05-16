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
import { UserRole } from 'src/entities/user.entity';
import { Roles } from '../auth/role.decorator';
import { CreateConcertDto, StatDto } from './concert.dto';
import { ConcertService } from './concert.service';

@Controller('concert')
export class ConcertController {
  private logger = new Logger(ConcertController.name);
  constructor(private readonly concertService: ConcertService) {}

  @Get()
  async getAllConcert(): Promise<Concert[]> {
    return this.concertService.getAllConcert();
  }

  @Get('/stat')
  @Roles(UserRole.ADMIN)
  async getConcertStat(): Promise<StatDto> {
    return this.concertService.getConcertStat();
  }

  @Post()
  @Roles(UserRole.ADMIN)
  async createConcert(
    @Body() createConcertDto: CreateConcertDto,
  ): Promise<Concert> {
    return this.concertService.createConcert(createConcertDto);
  }

  @Delete('/:id')
  @Roles(UserRole.ADMIN)
  async deleteConcert(@Param() param: any): Promise<Concert> {
    return this.concertService.deleteConcert(param.id);
  }
}
