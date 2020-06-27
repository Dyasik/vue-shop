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
    flex-basis: calc(49% - 10px);
    border: 1px solid #777;
    border-radius: 3px;
    overflow: hidden;
    margin: 5px;
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

  .body::-webkit-scrollbar {
    width: 6px;
  }

  .body::-webkit-scrollbar-track {
    background-color: #444;
  }

  .body::-webkit-scrollbar-thumb {
    background-color: #777;
    width: 4px;
    border-radius: 4px;
    box-shadow: inset 0 0 0 1px #444;
  }

  .category.collapsed .header {
    border-bottom: none;
  }

  .category.collapsed .body {
    max-height: 0;
  }

  @media screen and (max-width: 800px) {
    .category {
      flex-basis: calc(100% - 10px);
    }

    .body {
      max-height: 320px;
    }
  }
</style>