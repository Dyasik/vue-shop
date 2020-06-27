<template>
  <div class="product" @click="addToCart">
    <div class="name">
      {{ name }} ({{ count }})
    </div>
    <div class="price">
      {{ price | formatPrice }}
      <div class="cart-popup" :class="{ shown: popupTimeout }">
        Добавлено в корзину
      </div>
    </div>
  </div>
</template>

<script>
  import { MUTATIONS } from '../../store'
  import formatPrice from '../../filters/priceFormatter'

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
      }
    },
    destroyed() {
      clearTimeout(this.popupTimeout)
    },
    methods: {
      addToCart() {
        this.$store.commit(MUTATIONS.ADD_PRODUCT_TO_CART, this.productId)
        this.showCartPopup()
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
    padding: 8px 4px 8px 8px;
  }

  .product:not(:last-child) {
    border-bottom: 1px solid #777;
  }

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
  }

  .cart-popup {
    position: absolute;
    top: -1px;
    right: 100%;
    width: 0;
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