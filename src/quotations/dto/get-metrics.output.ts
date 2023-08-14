
export class CarrierMetrics {

  constructor(quantity: number, total_price: number) {
    this.quantity = quantity;
    this.total_price = total_price;
    this.average_price = total_price / quantity;
  }
  name: string;
  quantity: number;
  total_price: number;
  average_price: number;
}

export class GetMetricsOutput {

  constructor(carrier: CarrierMetrics[]) {
    this.carrier = carrier;
    let cheapest = 0;
    let most_expensive = 0;

    if (carrier.length > 0) {
      cheapest = carrier[0].total_price;
      most_expensive = carrier[0].total_price;
      for (let i = 0; i < carrier.length; i++) {
        //TODO:testar
      }
    }

    this.cheapest = cheapest;
    this.most_expensive = most_expensive;
  }

  carrier: CarrierMetrics[];
  cheapest: number;
  most_expensive: number;
}
