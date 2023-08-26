<template>
    <div class="page">
      <h3>{{ pageName }}</h3>
      <!-- 页面设计内容 -->
      <div>
        <!-- 可以放置其他组件或素材 -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['pageName']
  };
  </script>
  
  <style scoped>
  .page {
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
  }
  </style>
  