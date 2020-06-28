<template>
  <div class="cart-product">
    <div class="name">{{ name }}</div>
    <div class="price">{{ price | formatPrice }}</div>
    <div class="times">&times;</div>
    <div class="count-button" @click="decreaseCount">&ndash;</div>
    <input
        type="number"
        step="1"
        min="1"
        :max="count"
        class="count"
        @change="handleNewCount($event)"
        :value="itemsCount"
    />
    <div
        class="count-button"
        :class="{ disabled: !canIncreaseCount }"
        @click="increaseCount"
    >+</div>
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
      canIncreaseCount: function () {
        return this.$store.getters.canAddProductToCart(this.productId)
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
      increaseCount() {
        if (this.canIncreaseCount) {
          this.$store.commit(MUTATIONS.ADD_PRODUCT_TO_CART, this.productId)
        }
      },
      decreaseCount() {
        if (this.itemsCount === 1) {
          this.removeItem()
        } else {
          this.$store.commit(MUTATIONS.SET_CART_PRODUCT_COUNT, {
            productId: this.productId,
            newCount: this.itemsCount - 1,
          })
        }
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
    align-items: center;
    padding: 10px 0;
  }

  .cart-product:not(:last-child) {
    border-bottom: 1px solid #777;
  }

  .cart-product > * {
    margin: 0 5px;
  }

  .name {
    flex-grow: 1;
    text-align: left;
  }

  .count {
    width: 40px;
    height: 30px;
    text-align: right;
    box-sizing: border-box;
  }

  .count-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    color: darkorange;
    border: 1px solid;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .disabled {
    cursor: not-allowed;
    opacity: .5;
  }

  .cost {
    width: 130px;
    text-align: right;
    font-weight: bold;
  }

  .remove {
    cursor: pointer;
    margin-left: 15px;
  }

  @media screen and (max-width: 800px) {
    .cart-product {
      flex-wrap: wrap;
      padding: 20px 0;
    }

    .cart-product > * {
      margin: 10px 0;
    }

    .name {
      flex-basis: 100%;
    }

    .price {
      width: 40%;
    }

    .times {
      width: 20%;
    }

    .count {
      width: calc(40% - 60px);
    }

    .cost {
      width: unset;
    }
  }
</style>