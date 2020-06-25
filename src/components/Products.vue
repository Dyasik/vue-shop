<template>
  <div class="products">
    <Category
        v-for="(category, id) in products"
        :key="id"
        :title="category.title"
        :columns="category.columns"
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
  import Product from './product-components/Product';

  export default {
    name: 'Products',
    components: {Product, Category},
    computed: {
      products: function () {
        return this.$store.state.availableProducts
      },
    },
  }
</script>

<style scoped>
.products {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  max-width: 1100px;
  margin: auto;
  overflow-y: auto;
}
</style>