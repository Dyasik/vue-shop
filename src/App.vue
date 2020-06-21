<template>
  <div id="app">
    <Products :groupedProducts="groupedProducts"/>
<!--    <Cart/>-->
  </div>
</template>

<script>
import Products from './components/Products'
// import Cart from './components/Cart'

import store from './store'
import api from './api'

export default {
  name: 'App',
  components: {
    Products,
    // Cart,
  },
  async created() {
    await this.loadAllProducts()
    this.loadAvailableProducts()
  },
  data() {
    return {
      privateState: {
        allProducts: {},
        rawAvailableProducts: [],
      },
      store,
    }
  },
  computed: {
    groupedProducts: function () {
      const { allProducts, rawAvailableProducts } = this.privateState;
      const groupedProducts = {}

      rawAvailableProducts.forEach(p => {
        const groupId = p.G
        const productId = String(p.T)
        const category = allProducts[groupId]

        if (!groupedProducts[groupId]) {
          groupedProducts[groupId] = {
            title: category.G,
            products: [],
          }

          if (category.C) {
            groupedProducts[groupId].columns = category.C
          }
        }

        groupedProducts[groupId].products.push({
          productId,
          count: p.P,
          price: p.C,
          name: category.B[productId].N,
        });
      })

      console.log('New groupedProducts:', groupedProducts)

      return groupedProducts
    }
  },
  methods: {
    // designed to load once on app load
    async loadAllProducts() {
      let products;

      try {
        products = await api.getAllProducts()
      } catch (e) {
        alert('Failed to load products')
        console.warn('Failed to load products:', e)
      }

      if (products) {
        this.privateState.allProducts = products
      }
    },

    async loadAvailableProducts() {
      let products;

      try {
        products = await api.getAvailableProducts()
      } catch (e) {
        alert('Failed to load available products')
        console.warn('Failed to load available products:', e)
      }

      this.privateState.rawAvailableProducts = products.Value.Goods
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
