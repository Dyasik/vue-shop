<template>
  <div id="app">
    <Products/>
    <Cart/>
  </div>
</template>

<script>
import Products from './components/Products'
import Cart from './components/Cart'

import { MUTATIONS } from './store'
import api from './services/api'

export default {
  name: 'App',
  components: {
    Products,
    Cart,
  },
  async created() {
    await this.loadAllProducts()
    await this.loadAvailableProducts()
  },
  methods: {
    async loadAllProducts() {
      let products

      try {
        products = await api.getAllProducts()
      } catch (e) {
        alert('Failed to load products')
        console.warn('Failed to load products:', e)
      }

      if (products) {
        this.$store.commit(MUTATIONS.SET_ALL_PRODUCTS, products)
      }
    },

    async loadAvailableProducts() {
      let response

      try {
        response = await api.getAvailableProducts()
      } catch (e) {
        alert('Failed to load available products')
        console.warn('Failed to load available products:', e)
      }

      if (response) {
        const products = response.Value.Goods
        this.$store.commit(MUTATIONS.SET_AVAILABLE_PRODUCTS, products)
      }
    },
  },
}
</script>

<style>
body {
  background-color: #333;
}

#app {
  /* Added -apple-system font to support ₽ sign on iOS */
  font-family: -apple-system, Helvetica, Arial, sans-serif;
  line-height: 1.5em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: ivory;
  margin: auto;
  max-width: 1100px;
}
</style>
