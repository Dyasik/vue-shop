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
      Корзина пуста. Добавить товары в корзину можно нажав на цену товара.
    </div>
    <template v-else>
      <div v-for="(products, category) in cartProducts" :key="category">
        <div class="category">
          {{ category }}
        </div>
        <div v-for="productEntry in products"
            :key="productEntry.product.productId">
          {{ productEntry.product.name }}: {{ productEntry.product.price }} * {{ productEntry.count }}
        </div>
      </div>

      <div class="total">Итого: {{ total | formatPrice }}</div>
    </template>
  </div>
</template>

<script>
  import { MUTATIONS } from '../store'
  import formatPrice from '../filters/formatPrice'

  export default {
    name: 'Cart',
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
          .reduce((sum, cartItem) => sum + cartItem.product.price * cartItem.count, 0)
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
</style>