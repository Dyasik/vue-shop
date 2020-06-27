export default (price) => {
  let [ whole, fraction ] = String(price).split(/[,.]/)

  // separate every 3 digits of the whole part with space
  let index = 0
  const chars = whole.split('')
    .reduceRight((acc, digit) => {
      acc.unshift(digit)

      if (index++ % 3 === 2) {
        acc.unshift(' ')
      }

      return acc
    }, [])

  if (chars[0] === ' ') {
    chars.shift()
  }

  whole = chars.join('')

  // pad fractional part with zeroes
  fraction = fraction?.padEnd(2, '0') || '00';

  return whole + '.' + fraction
}
