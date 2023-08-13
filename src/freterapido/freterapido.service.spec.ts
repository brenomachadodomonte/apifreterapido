import { Test, TestingModule } from '@nestjs/testing';
import { FreterapidoService } from './freterapido.service';

describe('FreterapidoService', () => {
  let service: FreterapidoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FreterapidoService],
    }).compile();

    service = module.get<FreterapidoService>(FreterapidoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
