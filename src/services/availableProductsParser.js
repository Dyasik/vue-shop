export default function (allProducts, rawAvailableProducts) {
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

      if (category.C) {
        availableProducts[groupId].columns = category.C
      }
    }

    availableProducts[groupId].products.push({
      productId,
      count: p.P,
      price: p.C,
      name: category.B[productId].N,
    })
  })

  return availableProducts
}
