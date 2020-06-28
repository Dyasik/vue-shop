<template>
  <div id="app">
    <Currency/>
    <Products/>
    <Cart/>
  </div>
</template>

<script>
import Products from './components/Products'
import Cart from './components/Cart'
import Currency from './components/Currency'

import { MUTATIONS } from './store'
import api from './services/api'

export default {
  name: 'App',
  components: {
    Products,
    Cart,
    Currency,
  },
  async created() {
    await this.loadAllProducts()
    this.recursiveLoadData()
  },
  destroyed() {
    clearTimeout(this.dataLoadTimeout)
  },
  data: function() {
    return {
      dataLoadTimeout: null,
    }
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
        console.warn('Failed to load available products:', e)
      }

      if (response) {
        const products = response.Value.Goods
        this.$store.commit(MUTATIONS.SET_AVAILABLE_PRODUCTS, products)
      }
    },

    recursiveLoadData() {
      this.loadAvailableProducts()
        .finally(() => {
          this.dataLoadTimeout = setTimeout(this.recursiveLoadData, 15000)
        })
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

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background-color: #444;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #777;
    width: 4px;
    border-radius: 4px;
    box-shadow: inset 0 0 0 1px #444;
  }
</style>
