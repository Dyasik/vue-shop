<template>
  <div class="products">
    <Category
        v-for="(category, id) in products"
        :key="id"
        :title="category.title"
    >
      <Product
          v-for="product in category.products"
          :key="product.productId"
          v-bind="product"
      />
    </Category>
  </div>
</template>

<script>
  import Category from './product-components/Category'
  import Product from './product-components/Product'

  export default {
    name: 'Products',
    components: {Product, Category},
    computed: {
      products: function () {
        return this.$store.getters.products
      },
    },
  }
</script>

<style scoped>
.products {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  margin: auto;
  overflow-y: auto;
}
</style>