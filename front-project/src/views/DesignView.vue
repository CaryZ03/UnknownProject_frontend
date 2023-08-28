<template>
  <div class="container" id="capture">
    <div class="leftbar">
      <t-space direction="vertical">
        <t-button variant="outline" @click="cloneElement('mDropDown')" ghost
          >DropDown</t-button
        >
        <t-button variant="outline" @click="cloneElement('mDivider')" ghost
          >Divider</t-button
        >
        <t-button variant="outline" @click="cloneElement('mPagination')" ghost
          >Pagination</t-button
        >
        <t-button
          variant="outline"
          @click="cloneElement('mLinkComponent')"
          ghost
          >LinkComponent</t-button
        >
        <t-button variant="outline" @click="cloneElement('mTabs')" ghost
          >Tabs</t-button
        >
        <t-button variant="outline" @click="cloneElement('mToolBar')" ghost
          >ToolBar</t-button
        >
        <t-button variant="outline" @click="cloneElement('mToolBar')" ghost
          >幽灵按钮</t-button
        >
        <t-button variant="outline" @click="cloneElement('ComponentC')" ghost
          >幽灵按钮</t-button
        >
        <t-button variant="outline" @click="cloneElement('ComponentC')" ghost
          >幽灵按钮</t-button
        >
        <t-button variant="outline" @click="cloneElement('ComponentC')" ghost
          >幽灵按钮</t-button
        >
        <t-button variant="outline" @click="cloneElement('Button')" ghost
          >幽灵按钮</t-button
        >
        <t-button variant="outline" @click="captureAndSave" ghost
          >导出图片</t-button
        >
      </t-space>
    </div>
    <vue-draggable-resizable
      style="border: 0"
      :min-width="100"
      :min-height="900"
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
    </vue-draggable-resizable>

    <div ref="result">
      <img :src="imageUrl" v-if="imageUrl" alt="Captured Image" />
    </div>

    <div ref="elementToCapture" style="background-color:blanchedalmond ">
      <vue-draggable-resizable
        class="outContain"
        @activated="outerActive"
        :draggable="outDraggable"
        :resizable="true"
        :w="200"
        :h="200"
        style="border: 1px solid red; background-color: antiquewhite; z-index: -1;"

      >
        <vue-draggable-resizable
          :parent="true"
          v-for="(item, index) in clonedComponents"
          :key="index"
          :on-drag-start="innerDrag"
          :snap="true"
          @dragstop="innerDragStop"
          w="auto"
          h="auto"
        >
          <component-with-item :is="item"></component-with-item>
        </vue-draggable-resizable>
      </vue-draggable-resizable>
      <span>12313213213</span>
      <span>12313213213</span>
    </div>

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
import domToImage from "dom-to-image";

export default {
  data() {
    return {
      currentComponent: "ComponentA", // 默认绑定 ComponentA 组件
      dynamicComponent: null,
      clonedComponents: [], // 存储克隆的组件数组
      outDraggable: false,
      imageUrl: "",
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
    mToolBar,
  },
  methods: {
    async captureAndSave() {
      // const element = this.$refs.elementToCapture;
      // html2canvas(element,{ useCORS: true }).then((canvas) => {
      //   alert(canvas)
      //   this.imageUrl = canvas.toDataURL("image/png");
      //   alert(this.imageUrl)
      //   console.log(this.imageUrl)
      // });

      // var node = document.getElementById("capture");
      // // options 可不传
      // var options = {};
      // domtoimage
      //   .toPng(node, options)
      //   .then(function (dataUrl) {
      //     var img = new Image();
      //     img.src = dataUrl;
      //     document.body.appendChild(img);
      //   })
      //   .catch(function (error) {
      //     console.error("oops, something went wrong!", error);
      //   });ref="elementToCapture"
      const element = this.$refs.elementToCapture; // 替换为你的 DOM 元素的引用
      alert(element);
      this.imageUrl = await domToImage
        .toPng(element)
        .then((dataUrl) => {
          const a = document.createElement("a");
          a.setAttribute("download", "screenshot");
          a.href = dataUrl;
          a.click();
        })
        .catch((error) => {
          console.error("oops, something went wrong!", error);
        })
        .finally(this.close);
    },
    derChatIcon() {
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

    innerDrag() {
      this.outDraggable = false;
      console.log("drag");
    },
    innerDragStop() {
      this.outDraggable = true;
      console.log("stop!!!");
    },

    outerActive() {
      this.outDraggable = true;
    },
  },
};
</script>

<style>
.container {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(220.55deg, #565656 0%, #181818 100%);

  display: flex; /* 添加 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.leftbar {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  /* width: 10%; */
  height: 100%;
  /* background-size: cover;
  background-position: center; */
  /* background-image: linear-gradient(220.55deg, #565656 0%, #181818 100%); */

  display: flex; /* 添加 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
</style>
  