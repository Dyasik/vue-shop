<template>
  <div class="product" @click="addToCart">
    <div class="name">
      {{ name }} ({{ count }})
    </div>
    <div class="price">
      {{ price | formatPrice }}&nbsp;₽
    </div>
  </div>
</template>

<script>
  import { MUTATIONS } from '../../store'
  import formatPrice from '../../filters/formatPrice'

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
      formatPrice,
    },
    methods: {
      addToCart() {
        this.$store.commit(MUTATIONS.ADD_PRODUCT_TO_CART, this.productId)
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
    cursor: pointer;
  }
</style>