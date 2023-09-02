<template>
  <div class="container" id="capture">
    <div class="leftbar">
      <template>
        <t-menu
          theme="light"
          defaultValue="item2"
          :collapsed="collapsed"
          @change="changeHandler"
          height="550px"
        >
          <template #logo>
            <!-- <img :width="collapsed ? 35 : 136" :src="iconUrl" alt="logo" /> -->
          </template>
          <t-menu-group title="组件">
            <t-submenu title="画布大小" value="2-1">
              <template #icon>
                <icon name="server" />
              </template>
              <t-menu-item value="2-1-1" @click="changeCanvas('500px', '500px')"
                >IPONE
              </t-menu-item>
              <t-menu-item
                value="2-1-2"
                @click="changeCanvas('600px', '1024px')"
                >7寸平板电脑(600×1024)</t-menu-item
              >
              <t-menu-item
                value="2-1-3"
                @click="changeCanvas('720px', '1280px')"
                >10寸平板电脑(720×1280)</t-menu-item
              >
              <t-menu-item
                value="2-1-4"
                @click="changeCanvas('1024px', '768px')"
                >iPad(1024×768)</t-menu-item
              >
            </t-submenu>

            <t-submenu title="Layout" value="3-1">
              <template #icon>
                <icon name="server" />
              </template>
              <t-menu-item value="3-1-1" @click="cloneElement('testVue')"
                >IPONE
              </t-menu-item>
              <t-menu-item value="3-1-2" @click="cloneElement('testVue')"
                >7寸平板电脑(600×1024)</t-menu-item
              >
              <t-menu-item value="3-1-3" @click="cloneElement('testVue')"
                >10寸平板电脑(720×1280)</t-menu-item
              >
              <t-menu-item value="3-1-4" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              <t-menu-item value="3-1-5" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              <t-menu-item value="3-1-6" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              <t-menu-item value="3-1-7" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              <t-menu-item value="3-1-8" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              <t-menu-item value="3-1-9" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              <t-menu-item value="3-1-10" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              
            </t-submenu>

            <t-submenu title="Button" value="4-1">
              <template #icon>
                <icon name="server" />
              </template>
              <t-menu-item value="4-1-1" @click="cloneElement('testVue')"
                >IPONE
              </t-menu-item>
              <t-menu-item value="4-1-2" @click="cloneElement('testVue')"
                >7寸平板电脑(600×1024)</t-menu-item
              >
              <t-menu-item value="4-1-3" @click="cloneElement('testVue')"
                >10寸平板电脑(720×1280)</t-menu-item
              >
              <t-menu-item value="4-1-4" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              <t-menu-item value="4-1-5" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              <t-menu-item value="4-1-6" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              <t-menu-item value="4-1-7" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              <t-menu-item value="4-1-8" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              <t-menu-item value="4-1-9" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              <t-menu-item value="4-1-10" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              
            </t-submenu>

            <t-submenu title="Divider" value="5-1">
              <template #icon>
                <icon name="server" />
              </template>
              <t-menu-item value="5-1-1" @click="cloneElement('testVue')"
                >IPONE
              </t-menu-item>
              <t-menu-item value="5-1-2" @click="cloneElement('testVue')"
                >7寸平板电脑(600×1024)</t-menu-item
              >
              <t-menu-item value="5-1-3" @click="cloneElement('testVue')"
                >10寸平板电脑(720×1280)</t-menu-item
              >
              <t-menu-item value="5-1-4" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              <t-menu-item value="5-1-5" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
            </t-submenu>

            <t-submenu title="Breadcrumb" value="6-1">
              <template #icon>
                <icon name="server" />
              </template>
              <t-menu-item value="6-1-1" @click="cloneElement('testVue')"
                >IPONE
              </t-menu-item>
              <t-menu-item value="6-1-2" @click="cloneElement('testVue')"
                >7寸平板电脑(600×1024)</t-menu-item
              >
              <t-menu-item value="6-1-3" @click="cloneElement('testVue')"
                >10寸平板电脑(720×1280)</t-menu-item
              >
              <t-menu-item value="6-1-4" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              <t-menu-item value="6-1-5" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
            </t-submenu>

            <t-submenu title="DropDown" value="7-1">
              <template #icon>
                <icon name="server" />
              </template>
              <t-menu-item value="7-1-1" @click="cloneElement('testVue')"
                >IPONE
              </t-menu-item>
              <t-menu-item value="7-1-2" @click="cloneElement('testVue')"
                >7寸平板电脑(600×1024)</t-menu-item
              >
              <t-menu-item value="7-1-3" @click="cloneElement('testVue')"
                >10寸平板电脑(720×1280)</t-menu-item
              >
              <t-menu-item value="7-1-4" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              <t-menu-item value="7-1-5" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
            </t-submenu>

            <t-submenu title="Menu" value="8-1">
              <template #icon>
                <icon name="server" />
              </template>
              <t-menu-item value="8-1-1" @click="cloneElement('testVue')"
                >IPONE
              </t-menu-item>
              <t-menu-item value="8-1-2" @click="cloneElement('testVue')"
                >7寸平板电脑(600×1024)</t-menu-item
              >
              <t-menu-item value="8-1-3" @click="cloneElement('testVue')"
                >10寸平板电脑(720×1280)</t-menu-item
              >
              <t-menu-item value="8-1-4" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              <t-menu-item value="8-1-5" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
            </t-submenu>


            <t-submenu title="Pagination" value="9-1">
              <template #icon>
                <icon name="server" />
              </template>
              <t-menu-item value="9-1-1" @click="cloneElement('testVue')"
                >IPONE
              </t-menu-item>
              <t-menu-item value="9-1-2" @click="cloneElement('testVue')"
                >7寸平板电脑(600×1024)</t-menu-item
              >
              <t-menu-item value="9-1-3" @click="cloneElement('testVue')"
                >10寸平板电脑(720×1280)</t-menu-item
              >
              <t-menu-item value="9-1-4" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              <t-menu-item value="9-1-5" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
            </t-submenu>
          
            <t-submenu title="Steps" value="10-1">
              <template #icon>
                <icon name="server" />
              </template>
              <t-menu-item value="10-1-1" @click="cloneElement('testVue')"
                >IPONE
              </t-menu-item>
              <t-menu-item value="10-1-2" @click="cloneElement('testVue')"
                >7寸平板电脑(600×1024)</t-menu-item
              >
              <t-menu-item value="10-1-3" @click="cloneElement('testVue')"
                >10寸平板电脑(720×1280)</t-menu-item
              >
              <t-menu-item value="10-1-4" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              <t-menu-item value="10-1-5" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
            </t-submenu>

            <t-submenu title="Steps" value="11-1">
              <template #icon>
                <icon name="server" />
              </template>
              <t-menu-item value="11-1-1" @click="cloneElement('testVue')"
                >IPONE
              </t-menu-item>
              <t-menu-item value="11-1-2" @click="cloneElement('testVue')"
                >7寸平板电脑(600×1024)</t-menu-item
              >
              <t-menu-item value="11-1-3" @click="cloneElement('testVue')"
                >10寸平板电脑(720×1280)</t-menu-item
              >
              <t-menu-item value="11-1-4" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
              <t-menu-item value="11-1-5" @click="cloneElement('testVue')"
                >iPad(1024×768)</t-menu-item
              >
            </t-submenu>
          </t-menu-group>
          <t-menu-group title="导出">
            <t-menu-item @click="downloadHtmlFile" value="item4">
              <template #icon>
                <icon name="login" />
              </template>
              导出HTML
            </t-menu-item>
            <t-menu-item @click="createPreview" value="item5">
              <template #icon>
                <icon name="login" />
              </template>
              预览HTML
            </t-menu-item>

            <t-menu-item @click="captureAndSave" value="item6">
              <template #icon>
                <icon name="login" />
              </template>
              下载图片
            </t-menu-item>
            <t-menu-item @click="saveProto" value="item47">
              <template #icon>
                <icon name="login" />
              </template>
              保存该原型
            </t-menu-item>
          </t-menu-group>
          <template #operations>
            <t-button
              class="t-demo-collapse-btn"
              variant="text"
              shape="square"
              @click.native="changeCollapsed"
            >
              <icon name="view-list" />
            </t-button>
          </template>
        </t-menu>
      </template>
    </div>

    <div class="main" style="width: 68.5%; height: 100%; padding: 20px">
      <vue-ruler-tool
        :content-layout="{ left: 0, top: 0 }"
        :is-scale-revise="true"
      >
        <div ref="elementToCapture" :style="computedStyle">
          <vue-draggable-resizable
            :parent="true"
            v-for="(item, index) in clonedComponents"
            ref="draggableRes"
            :key="index"
            @resizing="
              (x, y, width, height) => innerResize(x, y, width, height, index)
            "
            @dragging="(x, y) => innerDrag(x, y, index)"
            @resizestop="innerResizeStop"
            :snap="true"
            @dragstop="innerDragStop"
            :w="x_scale[index]"
            :h="y_scale[index]"
            :x="x_off[index]"
            :y="y_off[index]"
            @activated="onSelected($event, index)"
            style="
              background-color: green;
              border: 1px solid rgb(255, 255, 255);
              -webkit-transition: background-color 200ms linear;
              -ms-transition: background-color 200ms linear;
              transition: background-color 200ms linear;
            "
          >
            <div slot="tl">😀</div>
            <div slot="tm">😀</div>
            <div slot="tr">😀</div>
            <div slot="mr">😀</div>
            <div slot="br">😀</div>
            <div slot="bm">😀</div>
            <div slot="bl">😀</div>
            <div slot="ml">😀</div>
            <component-with-item :is="item"></component-with-item>
          </vue-draggable-resizable>
        </div>
      </vue-ruler-tool>
    </div>
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
import { Icon } from "tdesign-icons-vue";


import SideBar from "@/components/Layouts/SideBar.vue";
import VueRulerTool from "vue-ruler-tool";
// import TumblrButton from '../components/Buttons/TumblrButton.vue';
export default {
  data() {
    return {
      canvasX: "500px",
      canvasY: "500px",
      canvasColor: "white",
      previewContent: "",
      teamid: -1,
      ptid: -1,
      currentComponent: "ComponentA", // 默认绑定 ComponentA 组件
      dynamicComponent: null,
      clonedComponents: [], // 存储克隆的组件数组
      outDraggable: false,
      imageUrl: "",
      selectComponent: null,
      selectedIndex: -1,
      ws: null,
      x_point: [],
      y_point: [],
      collapsed: false,
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
    SideBar,
    Icon,
  },
  mounted() {
    this.teamid = this.$route.params.teamid;
    this.ptid = this.$route.params.ptid;
    // TODO 添加检测
    document.addEventListener("keydown", this.handleKeyDown);
    this.ws = new WebSocket("ws://182.92.86.71:4514/ws/editor/1145/");
    this.ws.onmessage = this.handleMessage;
  },
  computed: {
    computedStyle() {
      return {
        backgroundColor: this.canvasColor,
        width: this.canvasX,
        height: this.canvasY,
      };
    },
  },
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
      this.canvasX = data.x_canvas;
      this.canvasY = data.y_canvas;
      console.log("receive");
    },

    sendMessage() {
      const sendData = JSON.stringify({
        message: this.clonedComponents,
        x_off: this.x_off,
        y_off: this.y_off,
        x_scale: this.x_scale,
        y_scale: this.y_scale,
        x_canvas: this.canvasX,
        y_canvas: this.canvasY,
      });
      this.ws.send(sendData);
    },

    downloadHtmlFile(fileName) {
      const element = this.$refs.elementToCapture; // DOM 元素的引用
      const htmlString = element.outerHTML;
      console.log(htmlString);
      alert(element);
      const htmlContent = htmlString;
      this.previewContent = htmlString;
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

    changeHandler(active) {
      console.log("change", active);
    },
    changeCollapsed() {
      this.collapsed = !this.collapsed;
      this.iconUrl = this.collapsed
        ? "https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/logo%402x.png"
        : "https://tdesign.gtimg.com/site/baseLogo-light.png";
    },
    changeCanvas(x, y) {
      this.canvasX = x;
      this.canvasY = y;
      console.log(x, y);
      this.sendMessage();
    },
    onDelete() {},

    createPreview() {
      const element = this.$refs.elementToCapture; // DOM 元素的引用
      const htmlString = element.outerHTML;
      console.log(htmlString);
      alert(element);
      const htmlContent = htmlString;
      this.previewContent = htmlString;

      this.$router.push({
        name: "preview",
        params: { teamid: this.teamid, ptid: this.ptid },
        query: { htmlString },
      });
    },

    test() {
      console.log("hihihi");
    },
    // 存给服务器
    saveProto() {
      const saveData = JSON.stringify({
        message: this.clonedComponents,
        x_off: this.x_off,
        y_off: this.y_off,
        x_scale: this.x_scale,
        y_scale: this.y_scale,
        x_canvas: this.canvasX,
        y_canvas: this.canvasY,
      });

      const sdmsg = {
        prototype_id: this.ptid,
        prototype_components: saveData,
      };

      this.$api.doc
        .post_save_prototype_components(sdmsg)
        .then((res) => {
          if (res.data["errno"] === 0) {
            console.log("参数保存成功");
          } else {
            console.log("参数保存失败：" + res.data["errno"]);
          }
        })
        .catch((err) => {
          console.log("获得error");
        });
    },
  },

  created() {
    this.teamid = this.$route.params.teamid;
    this.ptid = this.$route.params.ptid;
    const data = {
      prototype_id: this.ptid,
    };

    console.log("ptid:" + this.ptid);

    this.$api.doc
      .post_get_prototype_components(data)
      .then((res) => {
        if (res.data["errno"] === 0) {
          console.log("Sent Successfully!");
          const ddata = JSON.parse(res.data["components"]);
          this.clonedComponents = ddata.message;
          this.x_off = ddata.x_off;
          this.y_off = ddata.y_off;
          this.x_scale = ddata.x_scale;
          this.y_scale = ddata.y_scale;
          this.canvasX = ddata.x_canvas;
          this.canvasY = ddata.y_canvas;
        } else {
          console.log("I did not receive it ");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // 查成分是否是team内的成员可以参与编辑
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
  