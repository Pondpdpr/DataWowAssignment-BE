import { Test, TestingModule } from '@nestjs/testing';
import { ReserveController } from './reservation.controller';

describe('ReserveController', () => {
  let controller: ReserveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReserveController],
    }).compile();

    controller = module.get<ReserveController>(ReserveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
