<template>
  <div class="prototypedesign">
    <div class="sidebar">
      <h2>页面列表</h2>
      <ul>
        <li v-for="(page, index) in pages" :key="index" @click="selectPage(page)">{{ page }}</li>
      </ul>
      <button @click="addPage">添加页面</button>
    </div>
    <div class="canvas">
      <h2>设计区域</h2>
      <div v-if="selectedPage">
        <Page :pageName="selectedPage" />
      </div>
      <div v-else>
        <p>请在左侧选择一个页面进行设计</p>
      </div>
    </div>
  </div>
</template>

<script>
import Page from './Page.vue';

export default {
  components: {
    Page
  },
  data() {
    return {
      pages: [], // 页面列表
      selectedPage: null // 当前选中的页面
    };
  },
  methods: {
    addPage() {
      const newPageName = `Page ${this.pages.length + 1}`;
      this.pages.push(newPageName);
      this.selectedPage = newPageName;
    },
    selectPage(page) {
      this.selectedPage = page;
    }
  }
};
</script>

<style scoped>
.prototypedesign {
  display: flex;
}

.sidebar {
  flex: 1;
  padding: 20px;
}

.canvas {
  flex: 3;
  padding: 20px;
}
</style>
