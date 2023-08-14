import { Injectable, Logger } from '@nestjs/common';
import { CreateQuotationInput } from './dto/create-quotation.input';
import { FreterapidoService } from '../freterapido/freterapido.service';
import { CotacaoFreteOutput } from '../freterapido/dto/cotacao-frete.output';

@Injectable()
export class QuotationsService {
  private logger = new Logger(QuotationsService.name);
  constructor(private readonly freteRapidoService: FreterapidoService) {}
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
    // SAVE RESULT DATABASE
    // RETURN DTO
    return result;
  }
}
