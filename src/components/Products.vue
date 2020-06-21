<template>
  <div class="products">
    <Category
        v-for="(category, id) in groupedProducts"
        :key="id"
        v-bind="category"
    />
  </div>
</template>

<script>
  import Category from './product-components/Category'

  export default {
    name: 'Products',
    components: {Category},
    props: {
      groupedProducts: {
        type: Object,
        required: true,
      },
    },
  }
</script>

<style scoped>
.products {
  display: flex;
  flex-direction: column;
}
</style>