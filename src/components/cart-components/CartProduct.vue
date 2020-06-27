<template>
  <div class="cart-product">
    <div class="name">{{ name }}</div>
    <div class="price">{{ price | formatPrice }}</div>
    <div>&times;</div>
    <div class="count">{{ itemsCount }}</div>
    <div>&equals;</div>
    <div class="cost">{{ cost | formatPrice }}</div>
  </div>
</template>

<script>
  import formatPrice from '../../filters/formatPrice'

  export default {
    name: 'CartProduct',
    props: {
      productId: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      itemsCount: {
        type: Number,
        required: true,
      },
    },
    computed: {
      cost: function () {
        return this.price * this.itemsCount
      },
    },
    filters: {
      formatPrice,
    }
  }
</script>

<style scoped>
  .cart-product {
    display: flex;
    justify-content: space-between;
  }
</style>