export interface Tax {
  raw: number;
  value: string;
}

export interface Money {
  raw: number;
  formatted: string;
  formattedWithSymbol: string;
  formattedWithCode: string;
}

export interface Discount {
  productId: number;
  value: Money;
}

export interface Currency {
  code: string;
  symbol: string;
}
