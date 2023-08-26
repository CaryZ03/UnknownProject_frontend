<template>
    <!-- <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/contact">Contact</router-link>
    </nav>     -->
    <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
  <el-menu-item index="1" class="menu-item-custom">处理中心</el-menu-item>
  <el-submenu index="2">
    <template slot="title" class="menu-item-custom">我的工作台</template>
    <el-menu-item index="2-1"><router-link to="/Chat" class="menu-item-custom">Chat网页</router-link></el-menu-item>
    <el-menu-item index="2-2"><router-link to="/Text" class="menu-item-custom">在线文档</router-link></el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="3"><router-link to="/Community" class="menu-item-custom">Community</router-link></el-menu-item>
  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank" class="menu-item-custom">订单管理</a></el-menu-item>
  <div class="menu-right-top">
    <el-menu-item index="5" class="menu-avatar"><el-avatar size="small" :src="circleUrl"></el-avatar>
        <el-divider direction="vertical"></el-divider>
        用户名</el-menu-item>
    <router-link to="/Chat">
      <el-menu-item index="6" class="menu-bell">
        <el-badge class="item" :value="12" :max="99">
            <i class="el-icon-message-solid"></i>
        </el-badge>
    </el-menu-item>
    </router-link>
    
  </div>
</el-menu>
</template>
  
  <script>
  export default {
    name: 'Navbar',
    data() {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        };
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
    nav {
        background-color: #f5f5f5;
        padding: 20px;
    }
    .menu-right-top {
        display: flex;
        justify-content: flex-end;
    }
    .menu-avatar
    .menu-bell{
        margin-left: 10px;
    }
    .menu-item-custom {
        font-size: 16px;
        font-weight: bold;
    }
    .item {
        margin-top: 10px;
        margin-right: 40px;
        top: 12px;
    }
    .el-icon-message-solid {
        margin-top: -43px;
    }
  </style>