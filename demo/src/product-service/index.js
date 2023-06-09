export function isVolumeDiscount(quantity) {
  return quantity > 10;
}

export function calculateDiscount(quantity) {
  if (quantity > 50) {
    return 0.2;
  } else if (quantity > 20) {
    return 0.15;
  } else if (quantity > 10) {
    return 0.1;
  }

  return 0;
}