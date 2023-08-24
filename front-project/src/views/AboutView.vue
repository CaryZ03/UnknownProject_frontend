<template>
  <div>
    <h1>在线聊天室</h1>

    <!-- 聊天消息列表 -->
    <div class="message-list">
      <div v-for="message in messages" :key="message.id">
        <strong>{{ message.username }}:</strong>
        <span>{{ message.text }}</span>
      </div>
    </div>

    <!-- 输入框 -->
    <div class="input-box">
      <input type="text" v-model="messageText" @keyup.enter="sendMessage" placeholder="输入消息">
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import io from 'socket.io-client';

export default {
  data() {
    return {
      messages: [],
      messageText: '',
    };
  },
  mounted() {
    // 连接到聊天室的Socket服务器
    const socket = io('http://localhost:3000');

    // 监听来自服务器的新消息
    socket.on('newMessage', (message) => {
      this.messages.push(message);
    });
  },
  methods: {
    sendMessage() {
      // 发送消息到服务器
      axios.post('http://localhost:3000/messages', { text: this.messageText })
        .then(() => {
          this.messageText = '';
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
