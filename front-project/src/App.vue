<template>
  <router-view></router-view>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  mounted() {
    this.$api.user
      .get_check_token()
      .then((res) => {
        if (res.data["errno"] == 0) {
          // alert("0");
          this.$store.state.isLogin = true;
          localStorage.setItem("isLogin", true);
          this.$store.state.curUserMail = localStorage.getItem("curUserMail");
          this.$store.state.curUserID = localStorage.getItem("isLogin");
          // this.$router.push({
          //   path: `/WorkSpace`,
          // });
        } else {
          alert(res.data["errno"]);
          this.$store.state.isLogin = false;
          localStorage.setItem("isLogin", false);
        }
      })
      .catch((error) => {
        alert("error");
      });
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0; /* 取消或设置为 0 */
  width: 100%;
  height: 100%;
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>