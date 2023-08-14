import { Injectable } from '@nestjs/common';
import { CreateQuotationInput } from './dto/create-quotation.input';
import { FreterapidoService } from '../freterapido/freterapido.service';
import { CotacaoFreteOutput } from '../freterapido/dto/cotacao-frete.output';

@Injectable()
export class QuotationsService {
  constructor(private readonly freteRapidoService: FreterapidoService) {}
  hello() {
    return 'Hello Quotations';
  }

  async createQuotation(
    input: CreateQuotationInput,
  ): Promise<CotacaoFreteOutput> {
    // Call FRETE RÁPIDO API
    const result = await this.freteRapidoService.callCotacaoFreteV3(input);
    //console.log(result);
    // SAVE RESULT DATABASE
    // RETURN DTO
    return result;
  }
}
