<template>
    <el-container>
        <el-aside class="el-aside">
          
        </el-aside>

        <el-container>
            <el-header>花季猫狗猪猪兔兔牛马丁真收容中心(6)</el-header>
            <el-main>
              <div class="recv-message">
                  <el-row>
                        <el-col :span="1">
                          <el-avatar :src="circleUrl"></el-avatar>
                        </el-col>
                        <el-col :span="23">
                          <div>Xenon</div>
                          <div class="chat-bubble received">
                            收到的消息
                          </div>
                        </el-col>
                  </el-row>
                </div>
                <div class="send-message">
                  <el-row>
                        <el-col :span="23">
                          <div class="send-member">Xenon</div>
                          <div class="chat-bubble sent">
                            收到的消息
                          </div>
                        </el-col>
                        <el-col :span="1">
                          <el-avatar :src="circleUrl"></el-avatar>
                        </el-col>
                  </el-row>
                </div>
              <div v-for="message in chatMessages">
                <div class="recv-message" v-if="message.isSentByCurrentUser === false">
                  <el-row>
                        <el-col :span="1">
                          <el-avatar :src="circleUrl"></el-avatar>
                        </el-col>
                        <el-col :span="23">
                          <div>Xenon</div>
                          <div class="chat-bubble received">
                            {{ message.content }}
                          </div>
                        </el-col>
                  </el-row>
                </div>
                <div class="send-message" v-else>
                  <el-row>
                        <el-col :span="23">
                          <div class="send-member">Xenon</div>
                          <div class="chat-bubble sent">
                            {{ message.content }}
                          </div>
                        </el-col>
                        <el-col :span="1">
                          <el-avatar :src="circleUrl"></el-avatar>
                        </el-col>
                  </el-row>
                </div>
              </div>
            </el-main>
            <el-footer>
                <i class="el-icon-upload icon-set"></i>
                <i class="el-icon-picture icon-set"></i>
                <i class="el-icon-chat-dot-round icon-set"></i>
                <div class="inputArea">
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="messageInput"
                    class="inputArea-body">
                    </el-input>
                    <el-button type="success" plain class="send-button" @click="sendMessage">发送</el-button>
                </div>
            </el-footer>
        </el-container>
    </el-container>
</template>
  
  <script>

  export default {
    name: 'Chat',
    components: {
    },
    data() {
        return {
            chatLog: '',
            messageInput: '',
            chatSocket: null,
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            chatMessages: [
              { id: 1, content: "Hello", isSentByCurrentUser: true },
              { id: 2, content: "Hi there", isSentByCurrentUser: false },
              { id: 3, content: "How are you?", isSentByCurrentUser: true },
              { id: 4, content: "I'm good, thanks!", isSentByCurrentUser: false }
            ],
        };
    },
    mounted() {
        this.chatSocket = new WebSocket('ws://127.0.0.1:8000/ws/chat/1/');
        this.chatSocket.onmessage = this.handleMessage;
    },
    methods: {
        handleMessage(event) {
            const data = JSON.parse(event.data);
            let recv_message_used = {
              content: data.message,
              isSentByCurrentUser: false 
            }
            this.chatMessages.push(recv_message_used);
            },
        sendMessage() {
            const send_message = JSON.stringify({
                'message': this.messageInput,
                'user-id': '1234567',
                'user-name': 'Xenon'
            })
            let send_message_used = {
              content: this.messageInput,
              isSentByCurrentUser: true 
            }

            // 将消息存至数据库

            this.chatMessages.push(send_message_used);

            this.chatSocket.send(send_message);
            this.messageInput = '';
            // console.log(send_message)
            // console.log(this.chatMessages)
            console.log("send success")
            }
        }
    }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  .el-footer {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: #ffffff;
    color: #333;
    line-height: 60px;
    margin-right: 100px;
    height: 210px !important;
    margin-bottom: -900px;
    position: relative;
  }
  .el-header {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: #ffffff;
    color: #333;
    line-height: 60px;
    margin-right: 100px;
    font-size: 20px;
    border-radius: 0 5px 0 0; 
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    margin-bottom: -900px;
    width: 500px !important;
    margin-left: 60px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    margin-right: 100px;
    height: 650px;
    overflow: auto !important;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .icon-set {
    font-size: 30px;
    margin-right: 10px;
  }
  .inputArea {
    margin-top: -20px !important;
  }
  .inputArea-body{
    font-size: 16px;
  }
  .send-button {
    padding: 12px 40px;
    position: absolute;
    bottom: 0;
    right: 20px;
    margin-bottom: 10px;
  }
  .recv-message {
    position: relative;
  }
  .send-member {
    text-align: right;
    margin-right: 12px;
  }
  .send-message {
    position: relative;
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
    margin-left: 40px;
    float: right;
    margin-right: 13px;
  }
  .received {
    background-color: #e5e5ea;
    color: #000;
    align-self: flex-start;
    position: relative;
  }
  </style>