<template>
  <div class="cart-product">
    <div class="name">{{ name }}</div>
    <div class="price">{{ price | formatPrice }}</div>
    <div>&times;</div>
    <input
        type="number"
        step="1"
        min="1"
        :max="count"
        class="count"
        @change="handleNewCount($event)"
        :value="itemsCount"
    />
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
      count: {
        type: Number,
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
      },
      handleNewCount(event) {
        const newCount = event.target.valueAsNumber

        if (!this.isCountValid(newCount)) {
          event.target.value = this.itemsCount
          return
        }

        this.$store.commit(MUTATIONS.SET_CART_PRODUCT_COUNT, {
          productId: this.productId,
          newCount,
        })
      },
      isCountValid(count) {
        return Number.isInteger(count) && count > 0 && count <= this.count
      },
    },
    filters: {
      formatPrice,
    },
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