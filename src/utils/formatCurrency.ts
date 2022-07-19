const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, { currency: "EGP", style: "currency" });

export const formatCurrency = (number: number) => {
  return CURRENCY_FORMATTER.format(number);
}