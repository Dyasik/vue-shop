import Vue from 'vue'
import Vuex from 'vuex'

import parseAvailableProducts from './services/availableProductsParser'

Vue.use(Vuex)

export const MUTATIONS = {
  SET_ALL_PRODUCTS: 'setAllProducts',
  SET_AVAILABLE_PRODUCTS: 'setAvailableProducts',
  ADD_PRODUCT_TO_CART: 'addProductToCart',
}

export default new Vuex.Store({
  state: {
    allProducts: {},
    rawAvailableProducts: [],
    cart: [],
    currencyFactor: 65,
  },

  getters: {
    products: state => {
      const { allProducts, rawAvailableProducts, currencyFactor } = state

      return parseAvailableProducts(allProducts, rawAvailableProducts, currencyFactor)
    },
  },

  mutations: {
    [MUTATIONS.SET_ALL_PRODUCTS](state, products) {
      state.allProducts = products
    },

    [MUTATIONS.SET_AVAILABLE_PRODUCTS](state, products) {
      state.rawAvailableProducts = products
    },

    [MUTATIONS.ADD_PRODUCT_TO_CART](state, product) {
      console.log('addProductToCart > called with', product)
    },
  },
})
