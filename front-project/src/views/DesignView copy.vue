<template>


  <div class="container">
    <div ref="stageContainer" class="canvas-container"></div>


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

import Konva from "konva";

export default {
  data() {
    return {
      currentComponent: "ComponentA", // 默认绑定 ComponentA 组件
      dynamicComponent: null,
      clonedComponents: [], // 存储克隆的组件数组
      outDraggable: false,

      // ***********************for konvas*********************//
      stage: null,
      layer: null,
      shapes: [],
      isMouseDown: false,
      isDrawing: false,
      shape: null,
      deleteShape: null,
      isDragging: false,
      enterDraw: false,
      overShape: false,
      drawShape: "circle",
      // ***********************for konvas*********************//
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

  mounted() {
    //检测鼠标状态
    // this.stage.on('mousedown',()=>{
    //     this.isMouseDown=true
    //     console.log("!!!!!!!!!!!!!!!!")
    // });

    // this.stage.on('mouseup',()=>{
    //     this.isMouseDown=false
    // });
    //konvas舞台
    this.stage = new Konva.Stage({
      container: this.$refs.stageContainer,
      width: window.innerWidth,
      height: window.innerHeight,
      draggable: false,
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    this.stage.on("dragstart", () => {
      this.isDragging = true;
    });
    this.stage.on("dragmove", () => {});
    this.stage.on("dragend", () => {
      this.isDragging = false;
    });

    var startPos;
    this.stage.on("mousedown touchstart", (event) => {
      if (!this.overShape) {
        const { x, y } = event.target.getStage().getPointerPosition();
        console.log("!!!!!!!!!!!!!!!!");
        // startPos = {x,y}
        if (this.isDragging) return;
        this.isDrawing = true;
        switch (this.drawShape) {
          case "circle":
            this.shape = new Konva.Circle({
              x: x,
              y: y,
              radius: 0,
              stroke: "black",
              strokeWidth: 2,
              fill: "red",
              draggable: true,
            });
            console.log("draw circle");
            break;

          case "rect":
            this.shape = new Konva.Rect({
              x: x,
              y: y,
              width: 0,
              height: 0,
              stroke: "black",
              fill: "red",
              draggable: true,
            });
            console.log("draw rect");
            break;

          default:
            break;
        }

        this.shape.on("mouseover", () => {
          this.overShape = true;
        });
        this.shape.on("mouseout", () => {
          this.overShape = false;
        });

        console.log("break");
        this.layer.add(this.shape);
      }
    });
    this.stage.on("mousemove touchmove", (event) => {
      if (!this.isDrawing) return;
      if (this.isDragging) return;
      console.log("break2");
      const { x, y } = event.target.getStage().getPointerPosition();
      switch (this.drawShape) {
        case "circle":
          const pos = this.stage.getPointerPosition();
          const radius = Math.sqrt(
            Math.pow(x - this.shape.x(), 2) + Math.pow(y - this.shape.y(), 2)
          );

          console.log(radius);
          this.shape.radius(radius);
          this.layer.batchDraw();
          // 更新圆形的半径和位置
          // circle.radius(radius);
          console.log("draw circle");
          break;

        case "rect":
          const width = x - this.shape.x();
          const height = y - this.shape.y();
          this.shape.width(width);
          this.shape.height(height);
          this.layer.batchDraw();
          break;
        default:
          break;
      }
    });

    this.stage.on("mouseup touchend", () => {
      this.isDrawing = false;
      this.shape = null;
    });

    this.shape.on("mouseover mousedown", () => {
      this.isDragging = true;
    });

    // 删除
    // const deleteEle = () => {
    //     weapon.destroy();
    //     layer.batchDraw();
    // };

    // 绑定删除事件
    // document.getElementById('deleteButton').addEventListener('click', deleteEle);

    this.drawShape();
    this.drawGrid();
  },

  methods: {
    // *********************************for moveable *************************************
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

    // *********************************for moveable *************************************

    // *********************************for konvas *************************************
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    drawShape() {
      const rect = new Konva.Rect({
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        fill: "red",
        draggable: true,
      });

      this.layer.add(rect);
      this.layer.draw();

      this.shapes.push(rect);
    },
    handleZoom(event) {
      event.evt.preventDefault();
      const scaleBy = 1.1;
      const oldScale = this.stage.scaleX();
      const mousePointTo = {
        x:
          this.stage.getPointerPosition().x / oldScale -
          this.stage.x() / oldScale,
        y:
          this.stage.getPointerPosition().y / oldScale -
          this.stage.y() / oldScale,
      };
      const newScale =
        event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

      this.stage.scale({ x: newScale, y: newScale });

      const newPos = {
        x:
          -(mousePointTo.x - this.stage.getPointerPosition().x / newScale) *
          newScale,
        y:
          -(mousePointTo.y - this.stage.getPointerPosition().y / newScale) *
          newScale,
      };

      this.stage.position(newPos);
      this.stage.batchDraw();
    },
    //* *********************************for konvas*******************************
  },
};
</script>


<style scoped>
/* leftbar */
body {
  background: #eee;
  /* This is just a helper in case the element has a transparent background or white colors. */
}

@keyframes template_animation_leave {
  0% {
    background-position: 0 -2400px;
  }

  to {
    background-position: 0 0;
  }
}

* {
  box-sizing: border-box;
  margin: 0;
  outline: 0;
  padding: 0;
  user-select: none;
}

.inherited-styles-for-exported-element {
  color: #19191a;
  cursor: default;
  font-family: Inter, -apple-system, "San Francisco", "PingFang SC",
    "Noto Sans SC", "Microsoft YaHei", sans-serif;
  font-size: 12px;
  text-align: center;
}

.ed-svg-icon {
  transform: translateZ(0);
}

.templateTool {
  align-items: center;
  display: flex;
}

.templateTool--icon {
  background-image: url(https://cdn.boardmix.cn/app/assets/template-icon-spirit-a580efa1.png);
  background-size: cover;
  height: 80px;
  width: 80px;
}

.toolbar-item {
  align-items: center;
  display: flex;
  height: 40px;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  position: relative;
  width: 40px;
}

.toolbar-item--icon {
  border-radius: 4px;
  height: 40px;
  width: 40px;
}

.toolbar-item--icon-img {
  height: 40px;
  pointer-events: none;
  width: 40px;
}

.toolbar--content {
  background-color: #fff;
  border: 0.8px solid rgba(5, 4, 16, 0.09);
  border-image: none 100% 1 0 1 0 stretch;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(25, 25, 26, 0.06),
    0 2px 12px rgba(25, 25, 26, 0.04);
  padding: 3px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: left 0.15s;
  width: 48px;
  z-index: 10;
}

.toolbar--more {
  align-items: center;
  border-radius: 4px;
  display: flex;
  height: 40px;
  justify-content: center;
  position: relative;
  width: 40px;
}

.toolbar--scroller {
  padding-top: 8px;
  transition: height 0.2s;
}

.toolbar--before-item,
.toolbar--exchange-item {
  margin-bottom: 8px;
}

.toolbar--divider {
  background: rgba(5, 4, 16, 0.09);
  height: 1px;
  margin: 0 auto;
  width: 32px;
}

.toolbar--more-blue {
  background: #7856ff;
  border-radius: 50%;
  height: 6px;
  position: absolute;
  right: 0;
  top: 0;
  width: 6px;
}

.toolbar--more:hover,
.toolbar-item--icon:hover {
  background-color: rgba(18, 17, 42, 0.05);
}

.templateTool:hover .templateTool--animate {
  animation: template_animation_enter 0.15s steps(30) forwards;
  animation-range-end: normal;
  animation-range-start: normal;
  animation-timeline: auto;
}
</style>

  