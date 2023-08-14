import { IsNumberString, IsOptional } from 'class-validator';

export class GetMetricsInput {
  @IsOptional()
  @IsNumberString()
  last_quotes: string;
}
