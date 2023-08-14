import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateQuotationInput } from './dto/create-quotation.input';
import { FreterapidoService } from '../freterapido/freterapido.service';
import { CotacaoFreteOutput } from '../freterapido/dto/cotacao-frete.output';
import { DataSource } from 'typeorm';
import { QuotationEntity } from './quotation.entity';
import { GetMetricsInput } from './dto/get-metrics.input';
import { QuotationItemEntity } from './quotation-item.entity';

@Injectable()
export class QuotationsService {
  private logger = new Logger(QuotationsService.name);
  constructor(
    private dataSource: DataSource,
    private readonly freteRapidoService: FreterapidoService,
  ) {}

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

    if (result.carrier && result.carrier.length === 0) {
      throw new NotFoundException('No offers found for the provided input');
    }
    try {
      const reposotory = this.dataSource.getRepository(QuotationEntity);
      const saveData = {
        request_id: result.request_id,
        zipcode: input.recipient.address.zipcode,
        items: result.carrier.map((carrier) => ({ ...carrier })),
      };
      reposotory.save(saveData);
    } catch (e) {
      this.logger.error(e.message, e.trace);
    }
    // RETURN DTO
    return result;
  }

  async getMetrics(input: GetMetricsInput) {
    let where = '1=1';
    try {
      if (input.last_quotes) {
        const query = await this.dataSource
          .getRepository(QuotationEntity)
          .createQueryBuilder()
          .skip(0)
          .take(parseInt(input.last_quotes))
          .addOrderBy('id', 'DESC')
          .getMany();

        where = `quotationId in (${query.map((q) => q.id).join(',')})`;
      }

      const carrier = await this.dataSource.manager.query(
        `SELECT name,
                     COUNT(1) quantity,
                     SUM(price) total_price,
                     AVG(price) average_price
                FROM quotation_item_entity
               WHERE ${where}
               GROUP BY name`,
      );

      const cheapest = await this.dataSource
        .getRepository(QuotationItemEntity)
        .createQueryBuilder()
        .skip(0)
        .take(1)
        .addOrderBy('price', 'ASC')
        .getOne();

      const mostExpensive = await this.dataSource
        .getRepository(QuotationItemEntity)
        .createQueryBuilder()
        .skip(0)
        .take(1)
        .addOrderBy('price', 'DESC')
        .getOne();

      return {
        carrier: carrier.map((c) => ({
          name: c.name,
          quantity: parseInt(c.quantity),
          total_price: parseFloat(c.total_price),
          average_price: parseFloat(c.average_price),
        })),
        cheapest: cheapest,
        most_expensive: mostExpensive,
        last_quotes: parseInt(input.last_quotes),
      };
    } catch (e) {
      this.logger.error(e.message, e.trace);
      throw new NotFoundException('No metrics found for the provided input');
    }
  }
}
