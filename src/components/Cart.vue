<template>
  <div class="cart">
    <div class="header">
      <span>Корзина</span>
      <span
          v-if="!isCartEmpty"
          class="clear"
          @click="clearCart"
      >
        Очистить
      </span>
    </div>

    <hr/>

    <div v-if="isCartEmpty" class="empty">
      Корзина пуста. Добавить товары в корзину можно нажатием на цену товара.
    </div>
    <template v-else>
      <div v-for="(items, category) in cartProducts" :key="category">
        <div class="cart-category">
          {{ category }}
        </div>

        <CartProduct
            v-for="cartItem in items"
            :key="cartItem.product.productId"
            :product-id="cartItem.product.productId"
            :name="cartItem.product.name"
            :count="cartItem.product.count"
            :price="cartItem.product.price"
            :items-count="cartItem.count"
        />
      </div>

      <div class="total">
        <span>Итого:</span>
        <span class="total-cost">{{ total | formatPrice }}</span>
      </div>
    </template>
  </div>
</template>

<script>
  import CartProduct from './cart-components/CartProduct';

  import { MUTATIONS } from '../store'
  import formatPrice from '../filters/priceFormatter'
  import parsePrice from '../services/priceParser'

  export default {
    name: 'Cart',
    components: {CartProduct},
    computed: {
      cartProducts: function () {
        return this.$store.getters.cartProducts
      },
      isCartEmpty: function () {
        return !Object.keys(this.$store.getters.cartProducts).length
      },
      total: function () {
        return Object.values(this.cartProducts)
          .flat()
          .reduce((sum, cartItem) =>
            parsePrice(sum + cartItem.product.price * cartItem.count), 0)
      },
    },
    methods: {
      clearCart() {
        this.$store.commit(MUTATIONS.CLEAR_CART)
      },
    },
    filters: {
      formatPrice,
    }
  }
</script>

<style scoped>
  .cart {
    margin: 50px 0;
  }

  .header {
    text-align: left;
    font-size: 1.5em;
    padding: 0 10px;
  }

  .clear {
    font-size: .6em;
    float: right;
    border: 1px solid;
    border-radius: 4px;
    padding: 0 5px;
    cursor: pointer;
  }

  .empty {
    padding-top: 50px;
  }

  .cart-category {
    background-color: #444;
    width: fit-content;
    padding: 4px 10px;
    margin: 15px auto 5px;
    border-radius: 4px;
  }

  .total {
    text-align: right;
    font-weight: bold;
    font-size: 1.5em;
    margin: 40px 20px 0;
  }

  .total-cost {
    width: 200px;
    margin-left: 20px;
    display: inline-block;
  }
</style>