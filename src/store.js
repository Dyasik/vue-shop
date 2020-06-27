import Vue from 'vue'
import Vuex from 'vuex'

import parseAvailableProducts from './services/availableProductsParser'

Vue.use(Vuex)

export const MUTATIONS = {
  SET_ALL_PRODUCTS: 'setAllProducts',
  SET_AVAILABLE_PRODUCTS: 'setAvailableProducts',
  ADD_PRODUCT_TO_CART: 'addProductToCart',
  CLEAR_CART: 'clearCart',
  REMOVE_CART_PRODUCT: 'removeCartProduct',
  SET_CART_PRODUCT_COUNT: 'setCartProductCount',
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

    cartProducts: ({ cart }, { products }) => {
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

    canAddProductToCart: ({ cart }, { products }) => productId => {
      const currentCount = cart[productId]

      if (!currentCount) {
        return true
      }

      const { count: maxCount } = Object.values(products)
        .map(category => category.products)
        .flat()
        .find(p => p.productId === productId)

      return currentCount < maxCount
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

    [MUTATIONS.REMOVE_CART_PRODUCT](state, productId) {
      Vue.delete(state.cart, productId)
    },

    [MUTATIONS.SET_CART_PRODUCT_COUNT](state, { productId, newCount }) {
      const { cart } = state

      if (!cart[productId]) {
        console.warn('You can only set new count for a product that is already in the cart. pid:', productId)
        return
      }

      cart[productId] = newCount
    },
  },
})
