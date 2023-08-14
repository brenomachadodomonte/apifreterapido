import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateQuotationInput } from './dto/create-quotation.input';
import { FreterapidoService } from '../freterapido/freterapido.service';
import { CotacaoFreteOutput } from '../freterapido/dto/cotacao-frete.output';
import { DataSource } from 'typeorm';
import { QuotationEntity } from './quotation.entity';

@Injectable()
export class QuotationsService {
  private logger = new Logger(QuotationsService.name);
  constructor(
    private dataSource: DataSource,
    private readonly freteRapidoService: FreterapidoService,
  ) {}

  hello() {
    return 'Hello Quotations';
  }

  async createQuotation(
    input: CreateQuotationInput,
  ): Promise<CotacaoFreteOutput> {
    const result = await this.freteRapidoService.callCotacaoFreteV3(input);
    this.logger.verbose(
      `createQuotation: RESULT API CALL: ${JSON.stringify(result)}`,
    );

    if (result.carrier && result.carrier.length === 0) {
      throw new NotFoundException('No offers found for the provided input');
    }
    try {
      const reposotory = this.dataSource.getRepository(QuotationEntity);
      const saveData = {
        request_id: result.request_id,
        zipcode: input.recipient.address.zipcode,
        items: result.carrier.map((carrier) => ({ ...carrier })),
      };
      reposotory.save(saveData);
    } catch (e) {
      this.logger.error(e.message, e.trace);
    }
    // RETURN DTO
    return result;
  }
}
