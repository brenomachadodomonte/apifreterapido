import { Controller, Get } from '@nestjs/common';
import { QuotationsService } from './quotations.service';

@Controller('quotations')
export class QuotationsController {
  constructor(private readonly service: QuotationsService) {}

  @Get()
  helloQuotations() {
    return this.service.hello();
  }
}
