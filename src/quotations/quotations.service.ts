import { Injectable } from '@nestjs/common';

@Injectable()
export class QuotationsService {
  hello() {
    return 'Hello Quotations';
  }
}
