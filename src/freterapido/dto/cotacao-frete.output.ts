export class Carrier {
  constructor(name: string, service: string, deadline: string, price: string) {
    this.name = name;
    this.service = service;
    this.deadline = deadline;
    this.price = price;
  }

  name: string;
  service: string;
  deadline: string;
  price: string;
}

export class CotacaoFreteOutput {
  request_id: string;
  carrier: Carrier[];
}
