export default {
  debug: true,
  state: {
    cart: [],
  },
  addProductToCart(product) {
    if (this.debug) console.log('addProductToCart > called with', product)


  },
}
