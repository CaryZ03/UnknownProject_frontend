<template>
  <div class="container">
    <div 
      class="box" 
      :class="{ 'hovered': hover }"
      @mouseover="hover = true"
      @mouseout="hover = false"
    ></div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
      return {
          hover: false,
      };
  },
}
</script>


<style scoped>
.container {
  width: 200px;
  height: 200px;
}

.box {
  width: 100%;
  height: 100%;
  background-color: lightblue;
  transition: background-color 0.3s ease-out;
}

.hovered {
  background-color: darkblue;
}
</style>
