<template>
  <div class="currency">
    <div>1 у.е. &equals;</div>
    <input
        type="number"
        min="0"
        @change="handleNewCurrency($event)"
        :value="currencyFactor"
    />
    <div>₽</div>
  </div>
</template>

<script>
  import { MUTATIONS } from '../store'

  export default {
    name: 'Currency',
    computed: {
      currencyFactor: function () {
        return this.$store.state.currencyFactor
      },
    },
    methods: {
      handleNewCurrency(event) {
        const newFactor = event.target.valueAsNumber

        if (!this.isFactorValid(newFactor)) {
          event.target.value = this.currencyFactor
          return
        }

        this.$store.commit(MUTATIONS.SET_CURRENCY_FACTOR, newFactor)
      },
      isFactorValid(factor) {
        return !isNaN(factor) && factor > 0
      },
    },
  }
</script>

<style scoped>
  .currency {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 2em;
    margin: 20px 0;
  }

  .currency input {
    font-size: 0.7em;
    width: 100px;
    margin: 0 0.5em;
  }
</style>