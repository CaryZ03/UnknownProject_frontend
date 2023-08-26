<template>
  <div class="customhome-container">
      <div class="customhome-header">
          <head-bar 
          
          />
      </div>
      <div class="cushome-sidebar">
          <side-bar 
              :options="options"
              :selectors="selectors"
              @moveMouseDown="moveMouseDown"
          />
      </div>
      <div class="cushome-content">
          <div class="custom-design" id="custom-design">
              <grid-layout
                  :layout.sync="designData.layoutCon"
                  :col-num="12"
                  :is-draggable="true"
                  :is-resizable="true"
                  :is-mirrored="false"
                  :vertical-compact="true"
                  :margin="[10, 10]"
                  :use-css-transforms="true"
                  :row-height="rowheight"
                  @layout-created="layoutCreatedEvent"
                  @layout-before-mount="layoutBeforeMountEvent"
                  @layout-mounted="layoutMountedEvent"
                  @layout-ready="layoutReadyEvent"
                  @layout-updated="layoutUpdatedEvent"
              >
                  <div class="grid-container" id="grid-container" :style="bjStyles"></div>
                  <grid-item
                      v-for="(item, index) in designData.layoutCon"
                      :x="item.x"
                      :y="item.y"
                      :w="item.w"
                      :h="item.h"
                      :i="item.i"
                      :key="index"
                      :minH="3"
                      :minW="5"
                      :maxW="12"
                      :maxH="6"
                      @resize="resizeEvent"
                      @move="moveEvent"
                      @resized="resizedEvent"
                      @moved="movedEvent"
                  >
                      <div
                          class="design-conbox"
                          :class="curDesign == item.i ? 'activeBorder' : ''"
                          @click.stop="changeDesign(item.i)"
                      >
                          <div class="design-title d-flex">
                              <div class="row-tit d-flex">
                                  <div class="line"></div>
                                  <div class="tit-text">
                                      {{ designData.layoutData[index].title }}
                                  </div>
                              </div>
                              <i
                                  class="el-icon-close closeIcon"
                                  @click.stop="deleteDesignCon(designData.layoutData[index].id)"
                              ></i>
                          </div>
                          <div class="design-content">
                              <template v-if="designData.layoutData[index].type == 'table'">
                                  <table-con />
                              </template>
                              <template v-else>
                                  <echarts-con
                                      :eleId="designData.layoutData[index].id"
                                      :echartsType="designData.layoutData[index].type"
                                  />
                              </template>
                          </div>
                      </div>
                  </grid-item>
              </grid-layout>
          </div>
      </div>

      <!-- 移动组件 start -->
      <div class="moveCon d-flex" v-if="moveShow" :style="moveStyle">
          <i class="rowIcon el-icon-folder-remove"></i>
          <div class="item-name">{{ moveData.title }}</div>
      </div>
      <!-- 移动组件 end -->
  </div>
</template>

<script>
  import TableCon from "@/components/customComponents/Table/Table";
  import EchartsCon from "@/components/customComponents/Echarts/Echarts";
  import SideBar from '@/components/customComponents/sidebar/sidebar';
  import HeadBar from '@/components/customComponents/header/header';
  import { refreshWeb } from '@/libs/ulits/tool.js';
  export default {
      components: {
          SideBar,
          HeadBar,
          TableCon,
          EchartsCon,
      },
      data() {
          return {
              options: [
                  {
                      value: "1",
                      label: "合同报表",
                  },
                  {
                      value: "2",
                      label: "结算报表",
                  },
              ], //左侧分类选项
              selectors: [
                  {
                      id: "1",
                      title: "合同报表",
                      child: [
                          {
                              title: "表格1/1",
                              id: "1-1",
                              move: true,
                              type: "table",
                          },
                          {
                              title: "柱状图1/2",
                              id: "1-2",
                              move: true,
                              type: "bar",
                          },
                      ],
                  },
                  {
                      id: "2",
                      title: "结算报表",
                      child: [
                          {
                              title: "折线图2/1",
                              id: "2-1",
                              move: true,
                              type: "line",
                          },
                          {
                              title: "饼图2/2",
                              id: "2-2",
                              move: true,
                              type: "pie",
                          },
                      ],
                  },
              ], //menu数据
              designData: { layoutCon: [], layoutData: [] }, //容器内容
              bjStyles: {}, //栅格样式
              curDesign: "", //点击容器组件样式
              rowheight: 106, //默认一格高度
              moveShow: false, //显示移动元素
              moveStyle: {}, //显示移动元素的位置
              mouseFalg: false, //按下的开关
              mouseLeft: 0, //鼠标距离x轴位置
              mouseTop: 0, //鼠标距离y轴位置
              designLeft: 0, //自定义容器距离x轴位置
              designTop: 0, //自定义容器距离y轴位置
              moveData: {}, //元素内容
          };
      },
      methods: {
          // 对应Vue生命周期的created
          layoutCreatedEvent(newLayout) {
              // console.log("Created layout: ", newLayout)
          },
          // 对应Vue生命周期的beforeMount
          layoutBeforeMountEvent(newLayout) {
              // console.log("beforeMount layout: ", newLayout)
          },
          // 对应Vue生命周期的mounted
          layoutMountedEvent(newLayout) {
              // console.log("Mounted layout: ", newLayout)
          },
          // 当完成mount中的所有操作时生成的事件
          layoutReadyEvent(newLayout) {
              // console.log("Ready layout: ", newLayout)
          },
          // 更新事件（布局更新或栅格元素的位置重新计算）
          layoutUpdatedEvent(newLayout) {
              // console.log("Updated layout: ", newLayout)
          },
          // 移动时的事件
          moveEvent(i, newX, newY) {
              // console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
          },
          // 调整大小时的事件
          resizeEvent(i, newH, newW, newHPx, newWPx) {
              // console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
          },
          // 移动后的事件
          movedEvent(i, newX, newY) {
              // console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
          },
          // 调整大小后的事件
          resizedEvent(i, newH, newW, newHPx, newWPx) {
              // console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
          },
          //点击容器某一个组件
          changeDesign(idx) {
              if (this.curDesign == idx) {
                  return;
              }
              this.curDesign = idx;
          },
          //删除自定义组件布局
          deleteDesignCon(id) {
              this.deleteOnlyData(id);
              this.addClass(id, "no");
          },
          //删除容器里某一条数据
          deleteOnlyData(id) {
              let idx = this.filterData(id);
              this.designData.layoutCon.splice(idx, 1);
              this.designData.layoutData.splice(idx, 1);
          },
          //鼠标按下
          moveMouseDown(data, ev) {
              this.moveData = data;
              if (!this.haveData()) {
                  this.mouseFalg = true;
                  this.moveStyle = {
                      top: ev.clientY + "px",
                      left: ev.clientX + "px",
                  };
                  this.mouseLeft = ev.clientX;
                  this.mouseTop = ev.clientY;
              } else {
              }
          },
          //自定义布局容器是否有当前数据
          haveData() {
              let flag = false;
              for (
                  let i = 0, len = this.designData.layoutCon.length;
                  i < len;
                  i++
              ) {
                  if (this.designData.layoutCon[i].i == this.moveData.id) {
                      flag = true;
                  }
              }
              return flag;
          },
          //删除哪一条数据
          filterData(id) {
              for (
                  let i = 0, len = this.designData.layoutCon.length;
                  i < len;
                  i++
              ) {
                  if (this.designData.layoutCon[i].i == id) {
                      return i;
                  }
              }
          },
          addClass(id, type) {
              for (let i = 0, len = this.selectors.length; i < len; i++) {
                  let childs = this.selectors;
                  for (let j = 0, jen = childs[i].child.length; j < jen; j++) {
                      if (id == childs[i].child[j].id) {
                          if (type == "have") {
                              childs[i].child[j].move = false;
                          } else {
                              childs[i].child[j].move = true;
                          }
                      }
                  }
              }
          },
          //自定义容器初始化
          initDesign() {
              let domstyleWidth = document.getElementById("grid-container").offsetWidth - 12 * 10,
                  domstyleHeight = document.getElementById("grid-container").offsetHeight / 8,
                  domContainer = document.getElementById("custom-design"),
                  resWidth = domstyleWidth / 12,
                  everyWidth = ((resWidth / domstyleWidth) * 100).toFixed(2);
              this.bjStyles = {
                  right: "8px",
                  background: "linear-gradient(rgba(241, 243, 242, 1) 10px, transparent 0px) 0% 0%," +
                      "linear-gradient(to right, rgba(241, 243, 242, 1) 10px, transparent 0px) rgba(223, 232, 228, 1)",
                  "background-size": `${everyWidth}% ${domstyleHeight}px`,
              };
              this.rowheight = domstyleHeight - 10;
              this.designLeft = domContainer.offsetLeft + 250;
              this.designTop = domContainer.offsetTop + 70;
          },
          //鼠标移动
          moveMousemove() {
              window.onmousemove = (ev) => {
                  if (!this.mouseFalg) {
                      return;
                  }
                  this.moveShow = true;
                  this.moveStyle = {
                      top: ev.clientY + "px",
                      left: ev.clientX + "px",
                  };
                  this.mouseLeft = ev.clientX;
                  this.mouseTop = ev.clientY;
                  if (
                      this.mouseLeft >= this.designLeft &&
                      this.mouseTop >= this.designTop
                  ) {
                      if (!this.haveData()) {
                          this.computedPosi(
                              { w: 6, h: 4 },
                              this.moveData.id,
                              this.designData.layoutCon
                          );
                          this.designData.layoutData.push(this.moveData);
                          this.addClass(this.moveData.id, "have");
                      } else {
                          let X = this.mouseLeft - this.designLeft,
                              domstyleWidth = (document.getElementById("grid-container").offsetWidth - 12 * 10) / 12,
                              xlang = Math.floor(X / domstyleWidth / 2);
                          if (xlang > 6) {
                              xlang = 6;
                          }
                          this.designData.layoutCon[this.filterData(this.moveData.id)].x = xlang;
                      }
                  }
              };
          },
          //鼠标抬起
          moveMouseup() {
              window.onmouseup = () => {
                  if (this.mouseFalg) {
                      this.moveStyle = {
                          top: 0,
                          left: 0,
                      };
                      if (
                          this.mouseLeft < this.designLeft ||
                          this.mouseTop < this.designTop
                      ) {
                          if (this.haveData()) {
                              this.deleteOnlyData(this.moveData.id);
                              this.addClass(this.moveData.id, "no");
                          }
                      }
                      this.mouseLeft = 0;
                      this.mouseTop = 0;
                      this.moveShow = false;
                      this.mouseFalg = false;
                  }
              };
          },
          //计算位置
          computedPosi(item, itemId, layout) {
              let newItem = {
                  i: itemId,
                  x: 0,
                  y: 0,
                  w: item.w,
                  h: item.h,
              };
              let Ys = [],
                  maxX = 0,
                  maxY = 0,
                  edgeX = 0,
                  edgeY = 0;
              layout.map((item) => {
                  Ys.push(item.y + item.h);
              });
              maxY = (Ys.length && Math.max.apply(null, Ys)) || 1;
              edgeX = 12;
              edgeY = maxY;
              let gridMap = new Array();
              for (let x = 0; x < edgeX; x++) {
                  gridMap[x] = new Array();
                  for (let y = 0; y < edgeY; y++) {
                      gridMap[x][y] = 0;
                  }
              };
              layout.map((item) => {
                  for (let x = item.x; x < item.x + item.w; x++) {
                      for (let y = item.y; y < item.y + item.h; y++) {
                          gridMap[x][y] = 1;
                      }
                  }
              });
              for (let y = 0; y < edgeY; y++) {
                  for (let x = 0; x < edgeX; x++) {
                      if (edgeX - x >= item.w && edgeY - y >= item.h) {
                          let itemSignArr = [];
                          for (let a = x; a < x + item.w; a++) {
                              for (let b = y; b < y + item.h; b++) {
                                  itemSignArr.push(gridMap[x][y]);
                              }
                          }
                          if (itemSignArr.indexOf(1) < 0) {
                              newItem.x = x;
                              newItem.y = y;
                              layout.push(newItem);
                              return;
                          }
                      }
                  }
              };
              newItem.x = 0;
              newItem.y = edgeY + 1;
              layout.push(newItem);
          },
      },
      mounted() {
          this.initDesign();
          this.moveMousemove();
          this.moveMouseup();
          window.onclick = () => {
              this.curDesign = "";
          };
          refreshWeb(this,'/custom');
      },
      beforeRouteLeave(to, from, next) {
          const answer = window.confirm("当前页面数据未保存，确定要离开？");
          if (answer) {
              next();
          } else {
              next(false);
          }
      },
  };
</script>

<style lang="scss">
  .customhome-container {
      width: 100%;
      height: 100%;
      background: #f1f3f2;
      user-select: none;
      .cushome-sidebar {
          width: 240px;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          background: #fff;
          padding: 76px 16px 16px;
          overflow: auto;
          box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08);
      }
      .cushome-content {
          position: fixed;
          top: 60px;
          bottom: 0;
          right: 0;
          left: 240px;
          padding: 55px 80px;
          overflow: auto;
          .custom-design {
              width: 100%;
              height: 100%;
              .grid-container {
                  height: 100%;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  position: absolute;
              }
              .design-conbox {
                  width: 100%;
                  height: 100%;
                  background: #fff;
                  border: 1px dashed transparent;
                  &.activeBorder {
                      border: 1px dashed #197f54;
                  }
                  .design-title {
                      width: 100%;
                      height: 56px;
                      padding: 0 32px;
                      justify-content: space-between;
                      align-items: center;
                      .row-tit {
                          height: 100%;
                          align-items: center;
                          .line {
                              width: 4px;
                              height: 16px;
                              border-radius: 3px;
                              margin-right: 12px;
                              background: #197f54;
                          }
                          .tit-text {
                              height: 100%;
                              line-height: 56px;
                              font-size: 16px;
                              font-weight: 400;
                              color: #304265;
                              cursor: default;
                          }
                      }
                      .closeIcon {
                          font-size: 20px;
                          cursor: pointer;
                      }
                  }
                  .design-content {
                      width: 100%;
                      height: calc(100% - 56px);
                      padding: 0 31px 16px;
                  }
              }
          }
      }
      .moveCon {
          position: fixed;
          top: 0;
          left: 0;
          width: 208px;
          height: 40px;
          background: #edf5f2;
          border-radius: 4px;
          margin-bottom: 12px;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          padding-left: 16px;
          opacity: 0.5;
          .rowIcon {
              font-size: 20px;
          }
          .item-name {
              font-size: 14px;
              color: #303133;
              margin-left: 10px;
          }
      }
  }
</style>
<style lang="scss">
  .popover-content {
      padding-left: 12px;
      padding-right: 12px;
      color: #304265;
      p {
          margin: 0;
          height: 22px;
          font-size: 14px;
          line-height: 1.5;
          font-weight: 400;
      }
  }
  .el-popover__title {
      min-height: auto;
      padding-top: 18px;
      padding-bottom: 18px;
      padding-left: 12px;
      height: 22px;
      line-height: 22px;
      font-size: 14px;
      font-weight: 600;
      border-bottom: none;
  }
  .el-collapse-item__wrap {
      border-bottom: 0 !important;
  }
  .el-collapse-item__header {
      border-bottom: 0 !important;
  }
  .el-collapse {
      border-top: 0 !important;
      border-bottom: 0 !important;
  }
  .el-collapse-item__content {
      padding-bottom: 0 !important;
  }
  .el-collapse-item__header {
      font-size: 14px;
  }
  .custom-design .vue-grid-layout {
      min-height: calc(100% - 178px);
      padding-bottom: 200px;
      box-sizing: content-box;
  }
  .vue-grid-item.vue-grid-placeholder {
      background: #197f54;
  }
  .vue-grid-item > .vue-resizable-handle {
      position: absolute;
      width: 0;
      height: 0;
      border: 6px solid;
      border-color: transparent #e8eaef #e8eaef transparent;
      box-sizing: border-box;
      bottom: 6px;
      right: 6px;
      background: none;
      padding: 0;
  }
  .vue-grid-item:hover .vue-resizable-handle {
      border-color: transparent #197f54 #197f54 transparent;
  }
</style>
