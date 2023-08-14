import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { QuotationsService } from './quotations.service';
import { GetMetricsInput } from './dto/get-metrics.input';
import { CreateQuotationInput } from './dto/create-quotation.input';
import { CotacaoFreteOutput } from '../freterapido/dto/cotacao-frete.output';

@Controller()
export class QuotationsController {
  private logger = new Logger(QuotationsController.name);
  constructor(private readonly service: QuotationsService) {}

  @Post('/quote')
  createQuotation(
    @Body() input: CreateQuotationInput,
  ): Promise<CotacaoFreteOutput> {
    this.logger.verbose(`POST /quote Body: ${JSON.stringify(input)}`);
    return this.service.createQuotation(input);
  }

  @Get('/metrics')
  getQuotationMetrics(@Query() input: GetMetricsInput) {
    this.logger.verbose(`GET /metrics Query: ${JSON.stringify(input)}`);
    return this.service.hello();
  }
}
