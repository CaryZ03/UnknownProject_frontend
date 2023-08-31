
<!-- todo 需要查询组织其他的预览 -->
<template>
  <div class="tdesign-demo-item--layout">
    <t-layout>
      <t-header>
        <t-head-menu theme="light" value="item1" height="120px">
          <!-- <img
            slot="logo"
            width="136"
            class="logo"
            src="https://www.tencent.com/img/index/menu_logo_hover.png"
            alt="logo"
          /> -->
          <t-menu-item value="item1">已选内容</t-menu-item>
          <t-menu-item value="item2">菜单内容一</t-menu-item>
          <t-menu-item value="item3">菜单内容二</t-menu-item>
          <t-menu-item value="item4" :disabled="true">菜单内容三</t-menu-item>
          <template #operations>
            <a href="javascript:;"
              ><icon class="t-menu__operations-icon" name="search"
            /></a>
            <a href="javascript:;"
              ><icon class="t-menu__operations-icon" name="notification-filled"
            /></a>
              <router-link to="/Workspace"><icon class="t-menu__operations-icon" name="home"/></router-link>
          </template>
        </t-head-menu>
      </t-header>
      <t-content>
        <div
          class="main"
          style="
            -webkit-tap-highlight-color: transparent;
            background-color: #f0f8ff;
            color: rgba(0, 0, 0, 0.9);
            font-size: 14px;
            font-weight: 400;
            height: 825px;
            line-height: 22px;
            list-style: none;
            padding: 0;
            width: 800px;
            margin: 0 0 0 10%;
          "
          v-html="htmlString"
        ></div>
      </t-content>
    </t-layout>
  </div>
</template>



<script>
import { Icon } from "tdesign-icons-vue";
export default {
  name: "preview",
  data() {
    return {
      htmlString: "",
    };
  },
  components: {
    Icon,
  },
  mounted() {
    // 获取传递过来的 HTML 字符串
    this.htmlString = this.$route.query.htmlString;
  },


  methods(){

  }
};
</script>

<style>
.left {
  width: 30%;
  height: 100%;
  background-color: black;
}
</style>