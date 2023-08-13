export class Carrier {
  name: string;
  service: string;
  deadline: string;
  price: number;
}
export class CreateQuotationOutput {
  carrier: Carrier[];
}
