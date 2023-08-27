<template>
  <div class="container">
    <vue-draggable-resizable
      style="border: 1px solid black"
      :min-width="minWidth"
      :min-height="minHeight"
      :resizable="false"
      :w="65"
      :x="110"
      :y="200"
    >
    <!--     DragItem,
    ComponentA,
    ComponentB,
    ComponentC,
    mDivider,
    mDropDown,
    mLinkComponent,
    mPagination,
    mTabs,
    mToolBar -->
      <div
        @click="cloneElement('mDivider')"
        style="background-color: black; width: 63px; height: 63px; border: 3px"
      ></div>
      <div
        @click="cloneElement('mDropDown')"
        style="background-color: black; width: 63px; height: 63px; border: 3px"
      ></div>
      <div
        @click="cloneElement('mLinkComponent')"
        style="background-color: black; width: 63px; height: 63px; border: 3px"
      ></div>
      <div
        @click="cloneElement('mPagination')"
        style="background-color: black; width: 63px; height: 63px; border: 3px"
      ></div>
      <div
        @click="cloneElement('mTabs')"
        style="background-color: black; width: 63px; height: 63px; border: 3px"
      ></div>
      <div
        @click="cloneElement('mToolBar')"
        style="background-color: black; width: 63px; height: 63px; border: 3px"
      ></div>
      <div
        @click="cloneElement('ComponentC')"
        style="background-color: black; width: 63px; height: 63px; border: 3px"
      ></div>
    </vue-draggable-resizable>

    <vue-draggable-resizable class="outContain" @activated="outerActive"
      :draggable=outDraggable
      :resizable="true"
      :w="200"
      :h="200"

      
    >
      <vue-draggable-resizable 
        :parent="true"
        v-for="(item, index) in clonedComponents"
        :key="index"
        :on-drag-start="innerDrag"
        @dragstop="innerDragStop"
        w="auto" h="auto"
      >
        <component-with-item :is="item"></component-with-item>
      </vue-draggable-resizable>
    </vue-draggable-resizable>
    <div></div>
  </div>
</template>
  
  <script>
import DragItem from "@/components/Prototype/DragItem.vue";
import { ChatIcon, AddIcon, QrcodeIcon } from "tdesign-icons-vue";

import ComponentA from "../components/Prototype/Components/ComponentA.vue";
import ComponentB from "../components/Prototype/Components/ComponentB.vue";
import ComponentC from "../components/Prototype/Components/ComponentC.vue";

import mDivider from "../components/Prototype/Components/mDivider.vue";
import mDropDown from "../components/Prototype/Components/mDropDown.vue";
import mLinkComponent from "../components/Prototype/Components/mLinkComponent.vue";
import mPagination from "../components/Prototype/Components/mPagination.vue";
import mTabs from "../components/Prototype/Components/mTabs.vue";
import mToolBar from "../components/Prototype/Components/mToolBar.vue";


export default {
  data() {
    return {
      currentComponent: "ComponentA", // 默认绑定 ComponentA 组件
      dynamicComponent: null,
      clonedComponents: [], // 存储克隆的组件数组
      outDraggable: false
    };
  },
  components: {
    DragItem,
    ComponentA,
    ComponentB,
    ComponentC,
    mDivider,
    mDropDown,
    mLinkComponent,
    mPagination,
    mTabs,
    mToolBar
  },
  methods: {
    renderChatIcon() {
      return <ChatIcon />;
    },
    renderAddIcon() {
      return <AddIcon />;
    },
    renderQrIcon() {
      return <QrcodeIcon />;
    },
    renderPopup() {
      return (
        <img
          alt="TDesign Logo"
          width="120"
          height="120"
          src="https://tdesign.gtimg.com/site/site.jpg"
        />
      );
    },
    handleClick(context) {
      console.log("click", context);
    },
    handleHover(context) {
      console.log("hover", context);
    },
    cloneElement(ClonedComponent) {
      this.clonedComponents.push(ClonedComponent); // 将克隆的组件添加到数组中
    },

    changeComponent(component) {
      //   this.currentComponent = component; // 根据按钮点击选择要渲染的组件
      const DynamicComponent = Vue.extend(this.dynamicComponent);

      // 实例化动态组件
      this.dynamicComponent = new DynamicComponent().$mount();
    },

    innerDrag(){
        this.outDraggable=false
        console.log("drag")
    },
    innerDragStop(){
        this.outDraggable=true
        console.log("stop!!!")
    },

    outerActive(){
        this.outDraggable=true
    },


    
    
    
  },
};
</script>

  <style>
</style>
  