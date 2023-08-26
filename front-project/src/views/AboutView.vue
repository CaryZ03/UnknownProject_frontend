<template>
  <div class="chat-container">
    <div v-for="message in chatMessages" :key="message.id" :class="['chat-bubble', message.isSentByCurrentUser ? 'sent' : 'received']">
      {{ message.content }}
    </div>
  </div>
</template>

<style>
.chat-container {
  width: 100%;
  height: 300px;
  overflow-y: auto;
}

.chat-bubble {
  display: inline-block;
  max-width: 80%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 20px;
}

.sent {
  background-color: #3498db;
  color: #fff;
  align-self: flex-end;
  position: relative;
}

.received {
  background-color: #e5e5ea;
  color: #000;
  align-self: flex-start;
  position: relative;
}
.sent::before {
 content: "";
 position: absolute;
 right: -10px;
 top: 50%;
 transform: translateY(-50%);
 border-width: 10px;
 border-style: solid;
 border-color: transparent transparent transparent #3498db;
}

.received {
 background-color: #e5e5ea;
 color: #000;
 align-self: flex-start;
 position: relative;
}

.received::before {
 content: "";
 border-right: 10px solid #448844;
 border-bottom: 10px solid transparent;
 border-top: 10px solid transparent;
 /* position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 10px;
  border-style: solid;
  border-color: transparent #e5e5ea transparent transparent; */
}

</style>

<script>
export default {
  data() {
    return {
      chatMessages: [
        { id: 1, content: "Hello", isSentByCurrentUser: true },
        { id: 2, content: "Hi there", isSentByCurrentUser: false },
        { id: 3, content: "How are you?", isSentByCurrentUser: true },
        { id: 4, content: "I'm good, thanks!", isSentByCurrentUser: false }
      ]
    };
  }
};
</script>
