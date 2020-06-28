import parsePrice from './priceParser'

export default function (allProducts, rawAvailableProducts, currencyFactor) {
  const availableProducts = {}

  rawAvailableProducts.forEach(p => {
    const groupId = p.G
    const productId = p.T
    const category = allProducts[groupId]

    if (!availableProducts[groupId]) {
      availableProducts[groupId] = {
        title: category.G,
        products: [],
      }
    }

    availableProducts[groupId].products.push({
      productId,
      count: p.P,
      price: parsePrice(p.C, currencyFactor),
      name: category.B[productId].N,
    })
  })

  return availableProducts
}
