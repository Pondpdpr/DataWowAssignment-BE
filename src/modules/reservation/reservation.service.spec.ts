import { Test, TestingModule } from '@nestjs/testing';
import { Action } from '../../entities/reservationLog.entity';
import { ReservationRepository } from './reservation.repostory';
import { ReservationService } from './reservation.service';
import { ReservationLogRepository } from './reservationLog.repository';

describe('ReservationService', () => {
  let service: ReservationService;
  let reserveRepository: ReservationRepository;
  let logRepository: ReservationLogRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: ReservationRepository,
          useValue: {
            createReservation: jest.fn(),
            findReservedByUserId: jest.fn(),
            findById: jest.fn(),
            deleteById: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
        {
          provide: ReservationLogRepository,
          useValue: {
            createReservationLog: jest.fn(),
            findAll: jest.fn(),
            findUserAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    reserveRepository = module.get<ReservationRepository>(
      ReservationRepository,
    );
    logRepository = module.get<ReservationLogRepository>(
      ReservationLogRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createReservation', () => {
    it('should return reservation when success', async () => {
      const reservationInfo = {
        user: 'userId',
        concert: 'concertId',
      };
      const expectedReservation = {
        id: 'id',
        userId: 'userId',
        concertId: 'concertId',
      };
      jest
        .spyOn(reserveRepository, 'findReservedByUserId')
        .mockResolvedValueOnce(null);
      jest
        .spyOn(reserveRepository, 'createReservation')
        .mockResolvedValueOnce(expectedReservation);

      const reservation = await service.createReservation(reservationInfo);

      expect(reserveRepository.findReservedByUserId).toHaveBeenCalledWith(
        reservationInfo.user,
      );
      expect(reserveRepository.createReservation).toHaveBeenCalledWith(
        reservationInfo,
      );
      expect(logRepository.createReservationLog).toHaveBeenCalledWith({
        user: reservationInfo.user,
        reservation: expectedReservation.id,
        action: Action.RESERVE,
      });
      expect(reservation).toEqual(expectedReservation);
    });

    it('should throw Reservation already exists when reservation exist', async () => {
      const reservationInfo = {
        user: 'userId',
        concert: 'concertId',
      };
      const existingReservation = [
        {
          id: 'id',
          userId: 'userId',
          concertId: 'concertId',
        },
      ];
      const errorMessage = 'Reservation already exists';
      jest
        .spyOn(reserveRepository, 'findReservedByUserId')
        .mockResolvedValueOnce(existingReservation);

      await expect(
        async () => await service.createReservation(reservationInfo),
      ).rejects.toThrow(errorMessage);
      expect(reserveRepository.findReservedByUserId).toHaveBeenCalledWith(
        reservationInfo.user,
      );
    });
  });

  describe('cancelReservation', () => {
    it('should return reservation when success', async () => {
      const reservationInfo = {
        user: 'userId',
        reservation: 'reservationId',
      };
      const expectedReservation = {
        id: 'reservationId',
        userId: 'userId',
        concertId: 'concertId',
      };
      jest
        .spyOn(reserveRepository, 'findById')
        .mockResolvedValueOnce(expectedReservation);

      const reservation = await service.cancelReservation(reservationInfo);

      expect(reserveRepository.findById).toHaveBeenCalledWith(
        reservationInfo.reservation,
      );
      expect(reserveRepository.deleteById).toHaveBeenCalledWith(
        expectedReservation.id,
      );
      expect(logRepository.createReservationLog).toHaveBeenCalledWith({
        user: reservationInfo.user,
        reservation: expectedReservation.id,
        action: Action.CANCEL,
      });
      expect(reservation).toEqual(expectedReservation);
    });

    it('should throw Reservation not exists when no reservation', async () => {
      const reservationInfo = {
        user: 'userId',
        reservation: 'reservationId',
      };
      const errorMessage = 'Reservation not exists';
      jest.spyOn(reserveRepository, 'findById').mockResolvedValueOnce(null);

      await expect(
        async () => await service.cancelReservation(reservationInfo),
      ).rejects.toThrow(errorMessage);
      expect(reserveRepository.findById).toHaveBeenCalledWith(
        reservationInfo.reservation,
      );
    });
  });

  describe('getAllReservationLog', () => {
    it('should return all log when success', async () => {
      const expectedLog = [
        {
          id: 1,
          userId: 'userId1',
          reservationId: 'reservedId 1',
          action: Action.RESERVE,
          created_at: new Date(),
        },
        {
          id: 2,
          userId: 'userId2',
          reservationId: 'reservedId 2',
          action: Action.RESERVE,
          created_at: new Date(),
        },
      ];
      jest.spyOn(logRepository, 'findAll').mockResolvedValueOnce(expectedLog);

      const log = await service.getAllReservationLog();

      expect(logRepository.findAll).toHaveBeenCalledWith();
      expect(log).toEqual(expectedLog);
    });

    it('should throw error when repository error', async () => {
      const errorMessage = 'error message';
      jest.spyOn(logRepository, 'findAll').mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(
        async () => await service.getAllReservationLog(),
      ).rejects.toThrow(errorMessage);
      expect(logRepository.findAll).toHaveBeenCalledWith();
    });
  });

  describe('getUserReservationLog', () => {
    it('should return user log when success', async () => {
      const userId = 'userId1';
      const expectedLog = [
        {
          id: 1,
          userId: 'userId1',
          reservationId: 'reservedId 1',
          action: Action.RESERVE,
          created_at: new Date(),
        },
        {
          id: 2,
          userId: 'userId1',
          reservationId: 'reservedId 1',
          action: Action.CANCEL,
          created_at: new Date(),
        },
      ];
      jest
        .spyOn(logRepository, 'findUserAll')
        .mockResolvedValueOnce(expectedLog);

      const log = await service.getUserReservationLog(userId);

      expect(logRepository.findUserAll).toHaveBeenCalledWith(userId);
      expect(log).toEqual(expectedLog);
    });

    it('should throw error when repository error', async () => {
      const userId = 'userId1';
      const errorMessage = 'error message';
      jest.spyOn(logRepository, 'findUserAll').mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(
        async () => await service.getUserReservationLog(userId),
      ).rejects.toThrow(errorMessage);
      expect(logRepository.findUserAll).toHaveBeenCalledWith(userId);
    });
  });

  describe('getAllReservedByUser', () => {
    it('should return user log when success', async () => {
      const userId = 'userId';
      const expectedReservation = [
        {
          id: 'reservationId1',
          userId: 'userId',
          concertId: 'concertId2',
        },
        {
          id: 'reservationId1',
          userId: 'userId',
          concertId: 'concertId2',
        },
      ];
      jest
        .spyOn(reserveRepository, 'findReservedByUserId')
        .mockResolvedValueOnce(expectedReservation);

      const reservation = await service.getAllReservedByUser(userId);

      expect(reserveRepository.findReservedByUserId).toHaveBeenCalledWith(
        userId,
      );
      expect(reservation).toEqual(expectedReservation);
    });

    it('should throw error when repository error', async () => {
      const userId = 'userId1';
      const errorMessage = 'error message';
      jest
        .spyOn(reserveRepository, 'findReservedByUserId')
        .mockImplementation(() => {
          throw new Error(errorMessage);
        });

      await expect(
        async () => await service.getAllReservedByUser(userId),
      ).rejects.toThrow(errorMessage);
      expect(reserveRepository.findReservedByUserId).toHaveBeenCalledWith(
        userId,
      );
    });
  });
});
