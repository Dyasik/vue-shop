<template>
  <div id="app">
    <Products/>
<!--    <Cart/>-->
  </div>
</template>

<script>
import Products from './components/Products'
// import Cart from './components/Cart'

import { MUTATIONS } from './store';
import api from './services/api'
import parseAvailableProducts from './services/availableProductsParser'

export default {
  name: 'App',
  components: {
    Products,
    // Cart,
  },
  async created() {
    await this.loadAllProducts()
    await this.loadAvailableProducts()
  },
  methods: {
    async loadAllProducts() {
      let products;

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
      let response;

      try {
        response = await api.getAvailableProducts()
      } catch (e) {
        alert('Failed to load available products')
        console.warn('Failed to load available products:', e)
      }

      if (response) {
        const { allProducts } = this.$store.state;
        const products = response.Value.Goods
        const availableProducts = parseAvailableProducts(allProducts, products)

        this.$store.commit(MUTATIONS.SET_AVAILABLE_PRODUCTS, availableProducts)
      }
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
