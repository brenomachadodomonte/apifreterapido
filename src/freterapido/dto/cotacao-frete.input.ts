export class Shipper {
  constructor(registered_number: string, token: string, platform_code: string) {
    this.registered_number = registered_number;
    this.token = token;
    this.platform_code = platform_code;
  }
  registered_number: string;
  token: string;
  platform_code: string;
}

export class Recipient {
  constructor(type: 0 | 1, country: string, zipcode: number) {
    this.type = type;
    this.country = country;
    this.zipcode = zipcode;
  }
  type: number;
  country: string;
  zipcode: number;
}

export class Volume {
  constructor(
    category: string,
    amount: number,
    unitary_weight: number,
    price: number,
    sku: string,
    height: number,
    width: number,
    length: number,
  ) {
    this.category = category;
    this.amount = amount;
    this.unitary_weight = unitary_weight;
    this.unitary_price = price / amount;
    this.price = price;
    this.sku = sku;
    this.height = height;
    this.width = width;
    this.length = length;
  }

  category: string;
  amount: number;
  unitary_weight: number;
  unitary_price: number;
  price: number;
  sku: string;
  height: number;
  width: number;
  length: number;
}

export class Dispatcher {
  constructor(registered_number: string, zipcode: number, total_price: number) {
    this.registered_number = registered_number;
    this.zipcode = zipcode;
    this.total_price = total_price;
  }
  registered_number: string;
  zipcode: number;
  total_price: number;
  volumes: Volume[];
}

export class CotacaoFreteInput {
  shipper: Shipper;
  recipient: Recipient;
  simulation_type: number[];
  dispatchers: Dispatcher[];
}
