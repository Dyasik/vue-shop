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
      price: Math.round(p.C * currencyFactor * 100) / 100,
      name: category.B[productId].N,
    })
  })

  return availableProducts
}
