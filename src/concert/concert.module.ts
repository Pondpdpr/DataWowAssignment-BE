import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from 'src/entities/concert.entity';
import { ConcertController } from './concert.controller';
import { ConcertRepository } from './concert.repository';
import { ConcertService } from './concert.service';

@Module({
  imports: [TypeOrmModule.forFeature([Concert])],
  controllers: [ConcertController],
  providers: [ConcertService, ConcertRepository],
})
export class ConcertModule {}
