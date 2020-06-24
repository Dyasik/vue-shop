export default {
  // set to `true` to see logs from every action
  debug: true,

  state: {
    allProducts: {},
    availableProducts: [],
    cart: [],
  },

  setAllProducts(products) {
    this._log('setAllProducts > called with', products)
    this.state.allProducts = products
  },

  setAvailableProducts(products) {
    this._log('setAvailableProducts > called with', products)
    this.state.availableProducts = products
  },

  addProductToCart(product) {
    this._log('addProductToCart > called with', product)
  },

  _log(...args) {
    if (this.debug) {
      console.log(...args)
    }
  }
}
