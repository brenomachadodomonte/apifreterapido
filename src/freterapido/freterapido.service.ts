import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  CotacaoFreteInput,
  Dispatcher,
  Recipient,
  Shipper,
  Volume,
} from './dto/cotacao-frete.input';
import { CreateQuotationInput } from '../quotations/dto/create-quotation.input';
import { ConfigService } from '@nestjs/config';
import { CotacaoFreteOutput } from './dto/cotacao-frete.output';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FreterapidoService {
  private logger = new Logger(FreterapidoService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async callCotacaoFreteV3(
    quotationInput: CreateQuotationInput,
  ): Promise<CotacaoFreteOutput> {
    const input = this.buildCotacaoFreteInput(quotationInput);
    const url = this.configService.get('API_FRETE_RAPIDO');
    const path = '/v3/quote/simulate';
    const output = new CotacaoFreteOutput();
    output.carrier = [];
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(url + path, input),
      );
      //Mount data to output

      console.log(data);
    } catch (e) {
      this.logger.error(e.messageerror, e.stack);
    }

    return output;
  }

  private buildCotacaoFreteInput(
    quotationInput: CreateQuotationInput,
  ): CotacaoFreteInput {
    const input = new CotacaoFreteInput();

    const cnpj = this.configService.get('CNPJ');
    const token = this.configService.get('TOKEN');
    const code = this.configService.get('CODE');
    const cep = this.configService.get('CEP');

    input.shipper = new Shipper(cnpj, token, code);
    input.recipient = new Recipient(
      1,
      'BRA',
      parseInt(quotationInput.recipient.address.zipcode),
    );
    input.simulation_type = [0, 1]; // 0 = Fracionada | 1 = Lotação

    const totalPrice = quotationInput.volumes.reduce((t, i) => t + i.price, 0);
    const dispatcher = new Dispatcher(cnpj, parseInt(cep), totalPrice);

    dispatcher.volumes = quotationInput.volumes.map(
      (v) =>
        new Volume(
          v.category.toString(),
          v.amount,
          v.unitary_weight,
          v.price,
          v.sku,
          v.height,
          v.width,
          v.length,
        ),
    );
    input.dispatchers = [dispatcher];

    return input;
  }
}
