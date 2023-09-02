<template>
    <div class="box">
      <t-menu theme="dark" defaultValue="dashboard" height="550px">
        <img slot="logo" height="28" src="https://tdesign.gtimg.com/site/baseLogo-dark.png" alt="logo" />
        <t-menu-item value="dashboard">
          <template #icon>
            <icon name="dashboard" />
          </template>
          仪表盘
        </t-menu-item>
        <t-menu-item value="resource">
          <template #icon>
            <icon name="server" />
          </template>
          资源列表
        </t-menu-item>
        <t-menu-item value="root">
          <template #icon>
            <icon name="root-list" />
          </template>
          根目录
        </t-menu-item>
        <t-menu-item value="control-platform">
          <template #icon>
            <icon name="control-platform" />
          </template>
          调度平台
        </t-menu-item>
        <t-menu-item value="precise-monitor">
          <template #icon>
            <icon name="precise-monitor" />
          </template>
          精准监控
        </t-menu-item>
        <t-menu-item value="mail">
          <template #icon>
            <icon name="mail" />
          </template>
          消息区
        </t-menu-item>
        <t-menu-item value="user-circle">
          <template #icon>
            <icon name="user-circle" />
          </template>
          个人中心
        </t-menu-item>
        <t-menu-item value="play-circle">
          <template #icon>
            <icon name="play-circle" />
          </template>
          视频区
        </t-menu-item>
        <t-menu-item value="edit1">
          <template #icon>
            <icon name="edit-1" />
          </template>
          资源编辑
        </t-menu-item>
      </t-menu>
    </div>
  </template>
  
  <script>
  import { Icon } from 'tdesign-icons-vue';
  
  export default {
    components: {
      Icon,
    },
    methods: {
      changeHandler(active) {
        console.log('change', active);
      },
    },
  };
  </script>
  