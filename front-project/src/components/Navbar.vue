<template>
  <!-- <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/contact">Contact</router-link>
    </nav>     -->
  <el-menu class="el-menu-demo" mode="horizontal" background-color="#222427" text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1" class="menu-item-custom"><img :src="logoUrl" alt="接收的图片"></el-menu-item>
    <el-menu-item index="2" class="menu-item-custom"><router-link to="/WorkSpace" class="menu-item-custom">我的工作台</router-link></el-menu-item>
    <div class="menu-right-top">
      <el-menu-item index="5" class="menu-avatar">
        <el-avatar size="small">
        </el-avatar>
        <el-divider direction="vertical"></el-divider>
        {{ uname }}</el-menu-item>
      <router-link to="/Chat">
        <el-menu-item index="6" class="menu-bell">
          <el-badge class="item" :value="this.$store.state.notificationRedNum" :max="99">
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
      logoUrl: 'http://182.92.86.71:4514/media/file/unknown1.png',
      uname: this.$store.state.curUserName
    };
  },
  methods: {
    getInitials(name) {
      const splitName = name.split(" ");
      const initials = splitName.map((part) => part[0]).join("");
      return initials.toUpperCase();
    },
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

.menu-avatar .menu-bell {
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