<template>
  <div class="product">
    <div class="name">
      {{ name }} ({{ count }})
    </div>
    <div class="price">
      {{ price | formatPrice }}&nbsp;₽
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Product',
    props: {
      productId: {
        type: Number,
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
    filters: {
      formatPrice(price) {
        let [ whole, fraction ] = String(price).split(/[,.]/)

        fraction = fraction?.padEnd(2, '0') || '00';

        return whole + '.' + fraction
      },
    },
  }
</script>

<style scoped>
  .product {
    display: flex;
    justify-content: space-between;
    padding: 4px 4px 4px 8px;
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