<template>
  <div>
    <vue-draggable-resizable>
      <button @click="changeComponent('ComponentA')">Component A</button>
      <button @click="changeComponent('ComponentB')">Component B</button>
      <button @click="changeComponent('ComponentC')">Component C</button>

      <component :is="currentComponent"></component>
    </vue-draggable-resizable>
  </div>
</template>
  
  <script>
import ComponentA from "./Components/ComponentA.vue";
import ComponentB from "./Components/ComponentB.vue";
import ComponentC from "./Components/ComponentC.vue";

export default {
  data() {
    return {
      currentComponent: "ComponentA", // 默认绑定 ComponentA 组件
    };
  },
  components: {
    ComponentA,
    ComponentB,
    ComponentC,
  },
  methods: {
    changeComponent(component) {
      this.currentComponent = component; // 根据按钮点击选择要渲染的组件
    },
  },
};
</script>
  
  <style>
.content {
  height: 100%;
}

.item-content {
  margin: 10px;
}

.active {
  padding: 10px;
  border: springgreen 1px solid;
}
</style>
  