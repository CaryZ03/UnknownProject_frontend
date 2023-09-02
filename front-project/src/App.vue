<template>
  <div>
    <router-view></router-view>
    <!-- 在这里添加你的 HTML 模板代码 -->

    <!-- 示例: 显示接收到的通知消息 -->
    <div v-for="notification in notifications" :key="notification.id">
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      notifications: [], // 存储接收到的通知消息
      socket: null,
    };
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
          this.$store.state.curUserID = localStorage.getItem("curUserID");
          this.$store.state.curUserName = localStorage.getItem("curUserName");



        } else {
          alert(res.data["errno"]);
          this.$store.state.isLogin = false;
          localStorage.setItem("isLogin", false);
        }
      })
      .catch((error) => {
        alert("error");
      });
    this.socket = new WebSocket('ws://182.92.86.71:4514/ws/notification/receiver/7/');

    this.socket.addEventListener('open', (event) => {
      console.log('WebSocket connection opened:', event);

      // 在这里可以发送用户认证信息，如 token 或其他信息
      // this.socket.send(JSON.stringify({ "auth": "your_auth_token" }));
    });
    this.socket.addEventListener('message', (event) => {
      const notification = JSON.parse(event.data);
      console.log('Received notification:', notification);
      const result = JSON.parse(notification);
      console.log(typeof result.notification_receiver);
      console.log(typeof parseInt(this.$store.state.curUserID));
      if (result.notification_receiver === parseInt(this.$store.state.curUserID)) {
        // 将接收到的通知消息添加到数组中
        this.notifications.push(notification);
        const h = this.$createElement;

        this.$notify({
          title: '通知',
          message: h('i', { style: 'color: teal' }, "你收到了一条通知消息")
        });

        this.$store.state.notificationRedNum += 1;
      }
    });

    this.socket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed:', event);
    });
  },
  beforeDestroy() {
    // 在组件销毁之前，关闭 WebSocket 连接
    if (this.socket !== null) {
      this.socket.close();
    }
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
  margin-top: 0;
  /* 取消或设置为 0 */
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