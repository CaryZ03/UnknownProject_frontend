<template>
  <div>
    <img :src="imageSrc" alt="Sample Image" /> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrc: "" // 初始化图片地址
    };
  },
  mounted() {
    this.fetchImage(); // 在组件加载后获取图片
  },
  methods: {
    fetchImage() {
      const imageUrl = "http://182.92.86.71:4514/media/file/1_bfIetdE.png";
      
      fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
          // 创建 Blob 对象的 URL，用于在 <img> 标签中显示图片
          this.imageSrc = URL.createObjectURL(blob);
        })
        .catch(error => {
          console.error("Error fetching image:", error);
        });
    }
  }
};
</script>

<style>
/* 可以添加样式 */
</style>