<template>
  <div class="category">
    <div class="header">{{ title }} ({{ products.length }})</div>
    <div class="body">
      <Product
          v-for="product in products"
          :key="product.productId"
          v-bind="product"
      />
    </div>
  </div>
</template>

<script>
  import Product from './Product';
  export default {
    name: 'Category',
    components: {Product},
    props: {
      title: {
        type: String,
        required: true,
      },
      products: {
        type: Array,
        required: true,
      },
      columns: {
        type: Number,
        default: 1,
      },
    },
  }
</script>

<style scoped>
  .category {
    border: 1px solid gray;
    border-radius: 2px;
    overflow: hidden;
    margin: 2px;
  }

  .header {
    border-bottom: inherit;
    font-weight: bold;
  }
</style>