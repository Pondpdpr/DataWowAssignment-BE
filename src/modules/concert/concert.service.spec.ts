import { Test, TestingModule } from '@nestjs/testing';
import { ConcertRepository } from './concert.repository';
import { ConcertService } from './concert.service';

describe('ConcertService', () => {
  let service: ConcertService;
  let repository: ConcertRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcertService,
        {
          provide: ConcertRepository,
          useValue: {
            createConcert: jest.fn(),
            findAll: jest.fn(),
            getStat: jest.fn(),
            findById: jest.fn(),
            deleteById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ConcertService>(ConcertService);
    repository = module.get<ConcertRepository>(ConcertRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllConcert', () => {
    it('should return concerts when success', async () => {
      const expectedConcertList = [
        {
          id: 'id1',
          name: 'Cencert 1',
          description: 'Des 1',
          limit: 500,
        },
        {
          id: 'id2',
          name: 'Cencert 2',
          description: 'Des 2',
          limit: 500,
        },
      ];
      jest
        .spyOn(repository, 'findAll')
        .mockResolvedValueOnce(expectedConcertList);

      const concerts = await service.getAllConcert();

      expect(repository.findAll).toHaveBeenCalledWith();
      expect(concerts).toEqual(expectedConcertList);
    });

    it('should throw error when repository error', async () => {
      const errorMessage = 'error message';
      jest.spyOn(repository, 'findAll').mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(async () => await service.getAllConcert()).rejects.toThrow(
        errorMessage,
      );
      expect(repository.findAll).toHaveBeenCalledWith();
    });
  });

  describe('createConcert', () => {
    it('should return concert when create success', async () => {
      const newConcertInfo = {
        name: 'Cencert 1',
        description: 'Des 1',
        limit: 500,
      };
      const expectedNewConcert = {
        id: 'id',
        name: 'Cencert 1',
        description: 'Des 1',
        limit: 500,
      };
      jest
        .spyOn(repository, 'createConcert')
        .mockResolvedValueOnce(expectedNewConcert);

      const concert = await service.createConcert(newConcertInfo);

      expect(repository.createConcert).toHaveBeenCalledWith(newConcertInfo);
      expect(concert).toEqual(expectedNewConcert);
    });

    it('should throw error when repository error', async () => {
      const newConcertInfo = {
        name: 'Cencert 1',
        description: 'Des 1',
        limit: 500,
      };
      const errorMessage = 'error message';
      jest.spyOn(repository, 'createConcert').mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(
        async () => await service.createConcert(newConcertInfo),
      ).rejects.toThrow(errorMessage);
      expect(repository.createConcert).toHaveBeenCalledWith(newConcertInfo);
    });
  });

  describe('deleteConcert', () => {
    it('should return concert when delete success', async () => {
      const deleteConcertId = 'id';
      const expectedDeletedConcert = {
        id: 'id',
        name: 'Cencert 1',
        description: 'Des 1',
        limit: 500,
      };
      jest
        .spyOn(repository, 'findById')
        .mockResolvedValueOnce(expectedDeletedConcert);
      jest.spyOn(repository, 'deleteById').mockResolvedValueOnce();

      const concert = await service.deleteConcert(deleteConcertId);

      expect(repository.findById).toHaveBeenCalledWith(deleteConcertId);
      expect(repository.deleteById).toHaveBeenCalledWith(deleteConcertId);
      expect(concert).toEqual(expectedDeletedConcert);
    });

    it('should throw Concert not exists when there is no concert with id', async () => {
      const deleteConcertId = 'id';
      const errorMessage = 'Concert not exists';
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);

      await expect(
        async () => await service.deleteConcert(deleteConcertId),
      ).rejects.toThrow(errorMessage);
      expect(repository.findById).toHaveBeenCalledWith(deleteConcertId);
    });

    it('should throw error when findById error', async () => {
      const deleteConcertId = 'id';
      const errorMessage = 'error message';
      jest.spyOn(repository, 'findById').mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(
        async () => await service.deleteConcert(deleteConcertId),
      ).rejects.toThrow(errorMessage);
      expect(repository.findById).toHaveBeenCalledWith(deleteConcertId);
    });

    it('should throw error when deleteById error', async () => {
      const deleteConcertId = 'id';
      const expectedDeletedConcert = {
        id: 'id',
        name: 'Cencert 1',
        description: 'Des 1',
        limit: 500,
      };
      const errorMessage = 'error message';
      jest
        .spyOn(repository, 'findById')
        .mockResolvedValueOnce(expectedDeletedConcert);
      jest.spyOn(repository, 'deleteById').mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(
        async () => await service.deleteConcert(deleteConcertId),
      ).rejects.toThrow(errorMessage);
      expect(repository.findById).toHaveBeenCalledWith(deleteConcertId);
      expect(repository.deleteById).toHaveBeenCalledWith(deleteConcertId);
    });
  });

  describe('getConcertStat', () => {
    it('should return stats when success', async () => {
      const expectedStat = {
        seats: 500,

        reserved: 120,

        canceled: 15,
      };
      jest.spyOn(repository, 'getStat').mockResolvedValueOnce(expectedStat);

      const stat = await service.getConcertStat();

      expect(repository.getStat).toHaveBeenCalledWith();
      expect(stat).toEqual(expectedStat);
    });

    it('should throw error when repository error', async () => {
      const errorMessage = 'error message';
      jest.spyOn(repository, 'getStat').mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(async () => await service.getConcertStat()).rejects.toThrow(
        errorMessage,
      );
      expect(repository.getStat).toHaveBeenCalledWith();
    });
  });
});
