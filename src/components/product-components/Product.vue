<template>
  <div class="product" @click="addToCart">
    <div class="name">
      {{ name }} ({{ count }})
    </div>
    <div class="price">
      <div>{{ price | formatPrice }}</div>
      <div v-if="stonksDeltaClass" class="stonks-delta" :class="stonksDeltaClass">
        {{ stonksDelta }}
      </div>
      <div class="cart-popup" :class="{ shown: popupTimeout }">
        Добавлено в корзину
      </div>
    </div>
  </div>
</template>

<script>
  import { MUTATIONS } from '../../store'
  import formatPrice from '../../filters/priceFormatter'
  import parsePrice from '../../services/priceParser'

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
    data: function() {
      return {
        popupTimeout: null,
        // to avoid race condition
        lastPopupId: 0,
        stonksDeltaClass: '',
        stonksDelta: 0,
      }
    },
    watch: {
      price: function (newPrice, oldPrice) {
        let deltaSymbol = ''

        if (newPrice > oldPrice) {
          this.stonksDeltaClass = 'up'
          deltaSymbol = '+ '
        } else if (newPrice < oldPrice) {
          this.stonksDeltaClass = 'down'
          deltaSymbol = '– '
        } else {
          this.stonksDeltaClass = ''
        }

        this.stonksDelta = deltaSymbol + formatPrice(parsePrice(Math.abs(newPrice - oldPrice)))
      },
    },
    destroyed() {
      clearTimeout(this.popupTimeout)
    },
    methods: {
      addToCart() {
        if (this.$store.getters.canAddProductToCart(this.productId)) {
          this.$store.commit(MUTATIONS.ADD_PRODUCT_TO_CART, this.productId)
          this.showCartPopup()
        }
      },
      showCartPopup() {
        this.popupTimeout = setTimeout(this.hideCartTimeout, 1500, ++this.lastPopupId)
      },
      hideCartTimeout(popupId) {
        if (popupId === this.lastPopupId) {
          this.popupTimeout = null
        }
      },
    },
  }
</script>

<style scoped>
  .product {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 4px 8px 8px;
  }

  .product:not(:last-child) {
    border-bottom: 1px solid #777;
  }

  /*.product.up {*/
  /*  background-color: #4e2a2a;*/
  /*}*/

  /*.product.down {*/
  /*  background-color: #304c30;*/
  /*}*/

  .price {
    position: relative;
    width: 80px;
    align-self: center;
    flex-shrink: 0;
    font-size: 0.8em;
    font-weight: bold;
    color: darkorange;
    border: 1px solid;
    border-radius: 4px;
    cursor: pointer;
    background-color: #333;
  }

  .stonks-delta {
    font-size: 0.8em;
    line-height: 1em;
    padding-bottom: 2px;
    font-weight: normal;
  }

  .stonks-delta.up {
    color: red;
  }

  .stonks-delta.down {
    color: limegreen;
  }

  .cart-popup {
    position: absolute;
    top: -1px;
    right: 100%;
    width: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: width .2s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    overflow: hidden;
    white-space: nowrap;
    background-color: #333;
  }

  .cart-popup.shown {
    width: 160px;
    border: inherit;
    border-radius: inherit;
  }
</style>