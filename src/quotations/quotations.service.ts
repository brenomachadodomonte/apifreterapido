import { Injectable } from '@nestjs/common';
import { Carrier, CreateQuotationOutput } from './dto/create-quotation.output';
import { CreateQuotationInput } from './dto/create-quotation.input';
import { FreterapidoService } from '../freterapido/freterapido.service';

@Injectable()
export class QuotationsService {
  constructor(private readonly freteRapidoService: FreterapidoService) {}
  hello() {
    return 'Hello Quotations';
  }

  async createQuotation(
    input: CreateQuotationInput,
  ): Promise<CreateQuotationOutput> {
    // Call FRETE RÁPIDO API
    const result = await this.freteRapidoService.callCotacaoFreteV3(input);
    console.log(result);
    // SAVE RESULT DATABASE
    // RETURN DTO
    const carrier = new Carrier();
    carrier.service = 'teste';
    carrier.name = input.recipient.address.zipcode;
    const output = new CreateQuotationOutput();
    output.carrier = [];
    output.carrier.push(carrier);
    return output;
  }
}
