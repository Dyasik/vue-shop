<template>
  <div class="category" :class="{ collapsed: isCollapsed }">
    <div class="header" @click="toggleCollapse">
      {{ title }}
      <span v-if="isCollapsed">🔽</span>
      <span v-else>🔼</span>
    </div>
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
    },
    data: function () {
      return {
        isCollapsed: false,
      }
    },
    methods: {
      toggleCollapse() {
        this.isCollapsed = !this.isCollapsed
      },
    },
  }
</script>

<style scoped>
  .category {
    flex-basis: calc(50% - 5px);
    border: 1px solid #777;
    border-radius: 3px;
    box-sizing: border-box;
    overflow: hidden;
    margin: 5px 0;
  }

  .header {
    border-bottom: inherit;
    font-weight: bold;
    padding: 6px;
    background-color: #444;
    cursor: pointer;
  }

  .body {
    transition: max-height 0.4s ease-out;
    max-height: 500px;
    overflow-y: auto;
  }

  .category.collapsed .header {
    border-bottom: none;
  }

  .category.collapsed .body {
    max-height: 0;
  }

  @media screen and (max-width: 800px) {
    .category {
      flex-basis: 100%;
    }

    .body {
      max-height: 320px;
    }
  }
</style>