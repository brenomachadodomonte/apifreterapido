import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class QuotationsService {
  constructor(private readonly httpService: HttpService) {}
  hello() {
    return 'Hello Quotations';
  }
}
