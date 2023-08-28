<template>
  <div>
    <!-- 在这里添加你的 HTML 模板代码 -->

    <!-- 示例: 显示接收到的通知消息 -->
    <div v-for="notification in notifications" :key="notification.id">
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: [], // 存储接收到的通知消息
      socket: null,
    };
  },
  mounted() {
    this.socket = new WebSocket('ws://182.92.86.71:4514/ws/notification/receiver/7/');

    this.socket.addEventListener('open', (event) => {
      console.log('WebSocket connection opened:', event);

      // 在这里可以发送用户认证信息，如 token 或其他信息
      // this.socket.send(JSON.stringify({ "auth": "your_auth_token" }));
    });

    this.socket.addEventListener('message', (event) => {
      const notification = JSON.parse(event.data);
      console.log('Received notification:', notification);

      // 将接收到的通知消息添加到数组中
      this.notifications.push(notification);
      const h = this.$createElement;

        this.$notify({
          title: '通知',
          message: h('i', { style: 'color: teal'}, "你收到了一条通知消息")
        });
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
