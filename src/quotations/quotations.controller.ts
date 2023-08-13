import { Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { QuotationsService } from './quotations.service';

@Controller()
export class QuotationsController {
  private logger = new Logger('QuotationsController');
  constructor(private readonly service: QuotationsService) {}

  @Post('/quote')
  createQuotation() {
    this.logger.verbose('User creating a quotation');
    return this.service.hello();
  }

  @Get('/metrics')
  getQuotationMetrics(@Query('last_quotes') lastQuotes: number) {
    this.logger.verbose(`User getting metrics. Last quotes: ${lastQuotes}`);
    return this.service.hello();
  }
}
