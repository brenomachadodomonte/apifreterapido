import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Carrier, CreateQuotationOutput } from './dto/create-quotation.output';
import { CreateQuotationInput } from './dto/create-quotation.input';

@Injectable()
export class QuotationsService {
  constructor(private readonly httpService: HttpService) {}
  hello() {
    return 'Hello Quotations';
  }

  async createQuotation(
    input: CreateQuotationInput,
  ): Promise<CreateQuotationOutput> {
    // Call FRETE RÁPIDO API
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
