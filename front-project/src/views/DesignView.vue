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
        <t-button
          variant="outline"
          @click="cloneElement('ComponentInputIcon')"
          ghost
          >ComponentInputIcon</t-button
        >
        <t-button variant="outline" @click="cloneElement('LettersDIcon')" ghost
          >LettersDIcon</t-button
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
        <t-button variant="outline" @click="cloneElement('testVue')" ghost
          >test</t-button
        >
        <!--  -->
        <t-button variant="outline" @click="captureAndSave" ghost
          >导出图片</t-button
        >
        <t-button variant="outline" @click="downloadHtmlFile('test.html')" ghost
          >导出图片</t-button
        >
      </t-space>
    </div>

    <div
      ref="elementToCapture"
      class="hihihi"
      @click="test"
      style="background-color: blanchedalmond; width: 600px; height: 600px"
    >
      <vue-draggable-resizable
        :parent="true"
        v-for="(item, index) in clonedComponents"
        ref="draggableRes"
        :key="index"
        @resizing="(x, y, w, h) => innerResize(x, y, w, h, index)"
        @dragging="(x, y) => innerDrag(x, y, index)"
        @resizestop="innerResizeStop"
        :snap="true"
        @dragstop="innerDragStop"
        :w="x_scale[index]"
        :h="y_scale[index]"
        :x="x_off[index]"
        :y="y_off[index]"
        @activated="onSelected($event, index)"
      >
        <component-with-item :is="item"></component-with-item>
      </vue-draggable-resizable>
    </div>

    <div></div>
  </div>
</template>
  
  <script>
import DragItem from "@/components/Prototype/DragItem.vue";
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
import testVue from "./test.vue";

// import TumblrButton from '../components/Buttons/TumblrButton.vue';
export default {
  data() {
    return {
      currentComponent: "ComponentA", // 默认绑定 ComponentA 组件
      dynamicComponent: null,
      clonedComponents: [], // 存储克隆的组件数组
      outDraggable: false,
      imageUrl: "",
      selectComponent: null,
      selectedIndex: -1,
      ws: null,
      x_off: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ],
      y_off: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ],
      x_scale: [
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 100, 100, 100,
      ],
      y_scale: [
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 100, 100, 100,
      ],
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
    testVue,
  },
  mounted() {
    document.addEventListener("keydown", this.handleKeyDown);
    this.ws = new WebSocket("ws://182.92.86.71:4514/ws/editor/1145/");
    this.ws.onmessage = this.handleMessage;
  },
  // computed: {
  //   getInitialWidth() {
  //     return (index) =>
  //       this.x_scale[index] !== undefined ? this.w_scale[index] : "auto";
  //   },
  //   getInitialHeight() {
  //     return (index) =>
  //       this.y_scale[index] !== undefined ? this.h_scale[index] : "auto";
  //   },
  // },
  destroyed() {
    document.removeEventListener("keydown", this.handleKeyDown);
  },
  methods: {
    async captureAndSave() {
      const element = this.$refs.elementToCapture; // 替换为你的 DOM 元素的引用
      const htmlString = element.outerHTML;
      console.log(htmlString);
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

    handleMessage(event) {
      const data = JSON.parse(event.data);
      this.clonedComponents = data.message;
      this.x_off = data.x_off;
      this.y_off = data.y_off;
      this.x_scale = data.x_scale;
      this.y_scale = data.y_scale;
      console.log("receive");
    },

    sendMessage() {
      const sendData = JSON.stringify({
        message: this.clonedComponents,
        x_off: this.x_off,
        y_off: this.y_off,
        x_scale: this.x_scale,
        y_scale: this.y_scale,
      });
      console.log(sendData);
      this.ws.send(sendData);
      console.log("sent");
    },

    downloadHtmlFile(fileName) {
      const element = this.$refs.elementToCapture; // DOM 元素的引用
      const htmlString = element.outerHTML;
      console.log(htmlString);
      alert(element);
      const htmlContent = htmlString;
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },

    handleClick(context) {
      console.log("click", context);
    },
    handleHover(context) {
      console.log("hover", context);
    },
    cloneElement(ClonedComponent) {
      this.clonedComponents.push(ClonedComponent); // 将克隆的组件添加到数组中
      this.sendMessage();
    },
    handleKeyDown(event) {
      // 检测键盘事件并进行相应的处理
      if (event.keyCode === 13) {
        // 按下了回车键 (Enter)
        console.log("enter");
      } else if (event.keyCode === 27) {
        // 按下了 Esc 键
        console.log("esc");
      } else if (event.keyCode === 46 || event.keyCode === 8) {
        this.clonedComponents.splice(this.selectedIndex, 1);
        console.log("delete");
        this.sendMessage();
      }
    },
    innerDrag: function (x, y, index) {
      this.dragging = true;
      this.x_off[index] = x;
      this.y_off[index] = y;
      // this.x = x;
      // this.y = y;
      console.log();
    },

    innerDragStop() {
      this.outDraggable = true;
      console.log("stop!!!");
      this.sendMessage();
    },
    innerResize: function (x, y, w, h, index) {
      this.x_off[index] = x;
      this.y_off[index] = y;
      this.x_scale[index] = w;
      this.y_scale[index] = h;
      console.log(w, h);
      // this.w = w;
      // this.h = h;
    },
    innerResizeStop() {
      console.log("stop!!!");
      this.sendMessage();
    },

    outerActive() {
      this.outDraggable = true;
    },
    onSelected(event, index) {
      this.selectedIndex = index;
    },
    onDelete() {},

    test() {
      console.log("hihihi");
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
  