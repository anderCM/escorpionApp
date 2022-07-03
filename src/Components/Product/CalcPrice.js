export default function CalcPrice(price, discount) {
  if (!discount) return price.toFixed(2);
  const discountAmount = (price * discount) / 100;
  return (price - discountAmount).toFixed(2);
}
