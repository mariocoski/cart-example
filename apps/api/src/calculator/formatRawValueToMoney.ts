import { Currency, Money } from '../interfaces';

export const formatRawValueToMoney = (
  rawValue: number,
  currency: Currency
): Money => {
  const floatValue = rawValue.toFixed(2);
  return {
    raw: parseFloat(floatValue),
    formatted: floatValue,
    formattedWithSymbol: `${currency.symbol}${floatValue}`,
    formattedWithCode: `${floatValue} ${currency.code}`,
  };
};
