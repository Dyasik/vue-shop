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
    justify-content: space-between;
    padding: 4px;
  }

  .product:not(:last-child) {
    border-bottom: 1px solid #777;
  }

  .price {
    width: 80px;
    align-self: center;
    flex-shrink: 0;
    font-size: 0.8em;
    font-weight: bold;
    color: darkorange;
    border: 1px solid;
    border-radius: 4px;
  }
</style>