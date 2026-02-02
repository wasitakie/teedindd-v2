export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("th-TH", {
    style: "decimal",
    currency: "THB",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
  });
};
