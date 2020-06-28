const PRICE_PRECISION_FACTOR = 100

export default function (rawPrice, currencyFactor = 1) {
  return Math.round(rawPrice * currencyFactor * PRICE_PRECISION_FACTOR) / PRICE_PRECISION_FACTOR
}
