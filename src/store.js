import Vue from 'vue'
import Vuex from 'vuex'

import parseAvailableProducts from './services/availableProductsParser'

Vue.use(Vuex)

export const MUTATIONS = {
  SET_ALL_PRODUCTS: 'setAllProducts',
  SET_AVAILABLE_PRODUCTS: 'setAvailableProducts',
  ADD_PRODUCT_TO_CART: 'addProductToCart',
  CLEAR_CART: 'clearCart',
}

export default new Vuex.Store({
  state: {
    allProducts: {},
    rawAvailableProducts: [],
    cart: {},
    currencyFactor: 65,
  },

  getters: {
    products: state => {
      const { allProducts, rawAvailableProducts, currencyFactor } = state

      return parseAvailableProducts(allProducts, rawAvailableProducts, currencyFactor)
    },

    cartProducts: (state, getters) => {
      const { cart } = state
      const { products } = getters
      const selectedProductsIds = Object.keys(cart).map(id => +id)
      const cartProducts = {}

      for (const category of Object.values(products)) {
        const selectedProductsFromCategory = category.products
          .filter(p => selectedProductsIds.includes(p.productId))

        if (selectedProductsFromCategory.length) {
          cartProducts[category.title] = selectedProductsFromCategory.map(p => ({
            product: p,
            count: cart[p.productId],
          }))
        }
      }

      return cartProducts
    },
  },

  mutations: {
    [MUTATIONS.SET_ALL_PRODUCTS](state, products) {
      state.allProducts = products
    },

    [MUTATIONS.SET_AVAILABLE_PRODUCTS](state, products) {
      state.rawAvailableProducts = products
    },

    [MUTATIONS.ADD_PRODUCT_TO_CART](state, productId) {
      const { cart } = state

      if (cart[productId]) {
        cart[productId]++
      } else {
        Vue.set(cart, productId, 1)
      }
    },

    [MUTATIONS.CLEAR_CART](state) {
      state.cart = {}
    },
  },
})
