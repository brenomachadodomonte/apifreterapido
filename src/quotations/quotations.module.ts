import { Module } from '@nestjs/common';
import { QuotationsService } from './quotations.service';
import { QuotationsController } from './quotations.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { FreterapidoService } from '../freterapido/freterapido.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    HttpModule,
  ],
  providers: [QuotationsService, FreterapidoService],
  controllers: [QuotationsController],
})
export class QuotationsModule {}
