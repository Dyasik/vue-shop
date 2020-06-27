<template>
  <div class="cart-product">
    <div class="name">{{ name }}</div>
    <div class="price">{{ price | formatPrice }}</div>
    <div>&times;</div>
    <div class="count">{{ itemsCount }}</div>
    <div>&equals;</div>
    <div class="cost">{{ cost | formatPrice }}</div>
    <div class="remove" @click="removeItem">❌</div>
  </div>
</template>

<script>
  import formatPrice from '../../filters/priceFormatter'
  import { MUTATIONS } from '../../store'

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
    methods: {
      removeItem() {
        this.$store.commit(MUTATIONS.REMOVE_CART_PRODUCT, this.productId)
      }
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

  .remove {
    cursor: pointer;
  }
</style>