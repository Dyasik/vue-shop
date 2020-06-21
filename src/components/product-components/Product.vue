<template>
  <div class="product">
    <div class="name">
      {{ name }} ({{ count }})
    </div>
    <div class="price">
      {{ price }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Product',
    props: {
      productId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  }
</script>

<style scoped>
  .product {
    display: flex;
  }

  .price {
    width: 40px;
    font-weight: bold;
    background-color: lightgray;
  }
</style>