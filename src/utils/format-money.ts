export function formatMoney(num: number, showFractionDigits = true): string {
  return new Intl.NumberFormat('us-US', {
    style: 'currency',
    currency: 'USD',
    signDisplay: 'auto',
    maximumFractionDigits: showFractionDigits ? 2 : 0,
  }).format(num);
}
