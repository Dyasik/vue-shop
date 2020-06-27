<template>
  <div>
    <div v-for="(products, category) in cartProducts" :key="category">
      <h1>{{ category }}</h1>
      <ul>
        <li v-for="productEntry in products"
            :key="productEntry.product.productId">
          {{ productEntry.product.name }}: {{ productEntry.product.price }} * {{ productEntry.count }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Cart',
    computed: {
      cartProducts: function () {
        return this.$store.getters.cartProducts
      }
    }
  }
</script>

<style scoped>

</style>