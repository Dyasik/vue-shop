<template>
  <div class="category">
    <div class="header">{{ title }}</div>
    <div class="body">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Category',
    props: {
      title: {
        type: String,
        required: true,
      },
      columns: {
        type: Number,
        default: 1,
      },
    },
  }
</script>

<style scoped>
  .category {
    border: 1px solid gray;
    border-radius: 2px;
    overflow: hidden;
    margin: 2px;
  }

  .header {
    border-bottom: inherit;
    font-weight: bold;
  }
</style>