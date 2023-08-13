import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class AddressInput {
  @IsString()
  @IsNotEmpty()
  zipcode: string;
}

class RecipientInput {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressInput)
  address: AddressInput;
}

class VolumeInput {
  @IsNumber()
  @IsNotEmpty()
  category: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  unitary_weight: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @IsNotEmpty()
  height: number;

  @IsNumber()
  @IsNotEmpty()
  width: number;

  @IsNumber()
  @IsNotEmpty()
  length: number;
}
export class CreateQuotationInput {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RecipientInput)
  recipient: RecipientInput;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => VolumeInput)
  volumes: VolumeInput[];
}
