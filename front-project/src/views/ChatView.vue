<template>
    <div>
    <Navbar></Navbar>
    <el-container>
        <el-aside class="el-aside">
          <div class="department-container">
            <div
            class="department" :class="{ 'department-hovered': hoverList[0].hover }"
            @mouseover="hoverList[0].hover = true"
            @mouseout="hoverList[0].hover = false"
            >
              <el-row>
                <el-col :span="6">
                  <el-badge :value="this.redDotNum" class="red_dot" v-if="this.redDotNum > 0">
                    <el-avatar shape="square" :size="70" :src="sys_message_url" class="department-avatar-red" v-if="this.redDotNum > 0"></el-avatar>
                  </el-badge>
                  <el-avatar shape="square" :size="70" :src="sys_message_url" class="department-avatar-red" v-else></el-avatar>
                </el-col>
                <el-col :span="18">
                  <div class="department-name">系统消息</div>
                  <div class="depertment-latest-message">
                    Xenon: 收到的消息
                  </div>
                </el-col>
              </el-row>
            </div>

            <div 
            class="department" :class="{ 'department-hovered': hoverList[0].hover }"
            @mouseover="hoverList[0].hover = true"
            @mouseout="hoverList[0].hover = false"
            @click=""
            >
              <el-row>
                <el-col :span="6">
                  <el-badge :value="this.redDotNum" class="red_dot" v-if="this.redDotNum > 0">
                    <el-avatar shape="square" :size="70" :src="circleUrl" class="department-avatar-red" v-if="this.redDotNum > 0"></el-avatar>
                  </el-badge>
                  <el-avatar shape="square" :size="70" :src="circleUrl" class="department-avatar" v-else></el-avatar>

                </el-col>
                <el-col :span="18">
                  <div class="department-name">花季猫狗猪猪兔兔牛马丁真收容中心</div>
                  <div class="depertment-latest-message">
                    Xenon: 收到的消息
                  </div>
                </el-col>
              </el-row>
            </div>
        
          </div>
      
        </el-aside>

        <el-container>
            <el-header>{{ this.curDepartment }}({{ this.memberList.length }})</el-header>
            <el-main id="scrollContainer" class="scrollContainer">
              <div>
              <div v-for="message in chatMessages">
                <div class="recv-message" v-if="message.isSentByCurrentUser === false">
                  <el-row>
                        <el-col :span="1">
                          <el-avatar :src="circleUrl"></el-avatar>
                        </el-col>
                        <el-col :span="23">
                          <div>{{ message.user_name }}</div>
                          <div v-if="isImageMessage(message)" class="chat-bubble received">
                          <img :src="message.content" alt="接收的图片">
                          </div>
                          <div v-else class="chat-bubble received">
                            {{ message.content }}
                          </div>
                        </el-col>
                  </el-row>
                </div>
                <div class="send-message" v-else>
                  <el-row>
                        <el-col :span="23">
                          <div class="send-member">{{ uname }}</div>
                          <div v-if="isImageMessage(message)" class="chat-bubble sent">
                            <img :src="message.content" alt="发送的图片">
                          </div>
                          <div v-else class="chat-bubble sent">
                            {{ message.content }}
                          </div>
                        </el-col>
                        <el-col :span="1">
                          <el-avatar :src="circleUrl"></el-avatar>
                        </el-col>
                  </el-row>
                </div>
              </div>
            </div>

            <!-- 文件框 -->
            <div>
              <input type="file" ref="fileInput" style="display: none" @change="send_file">
            </div>

            <!-- 历史记录对话框 -->
            <div>
              <el-dialog
                title="历史记录" 
                :visible.sync="historyVisible"
                width="30%"
                :before-close="handleClose"
                class="dialog-history">
                <span>历史记录</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="historyVisible = false">取 消</el-button>
                  <el-button type="primary" @click="historyVisible = false">确 定</el-button>
                </span>
              </el-dialog>
            </div>
            </el-main>
            <el-footer>
              <el-row id="icon-button">
                <el-col :span="3">
                  <i class="el-icon-folder-opened icon-set" @click="openFileManager"></i>
                  <i class="el-icon-picture icon-set"></i>
                  <i class="el-icon-chat-dot-round icon-set" @click="historyVisible = true"></i>
                </el-col>
                <el-col :span="1">
                  <el-popover
                    placement="top"
                    width="160"
                    v-model="atVisible" id="atPop">
                    <p>@成员</p>
                    <div class="department-member" @click="atAll">所有人</div>
                    <div v-for="(member, index) in memberList" :key="index" :id="'generated-div-' + index" class="department-member" @click="atMember(index)">
                      {{ member.name }}
                    </div>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="atVisible = false">取消</el-button>
                      <el-button type="primary" size="mini" @click="atVisible = false">确定</el-button>
                    </div>
                  <div class="at" slot="reference" @click="openAtMenu">@</div>
                </el-popover>
                </el-col>
                <el-col :span="20">
                
                </el-col>
              </el-row>
                

                <div class="inputArea">
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="messageInput"
                    class="inputArea-body"
                    @keyup.enter.native="handleEnter"
                    >
                    </el-input>
                    <el-button type="success" plain class="send-button" @click="sendMessage">发送</el-button>
                </div>
            </el-footer>
        </el-container>
    </el-container>
  </div>
</template>
  
  <script>
import Navbar from '@/components/Navbar.vue';


  export default {
    name: 'Chat',
    components: {
    Navbar
},
    data() {
        return {
            uid: this.$store.state.curUserID,
            uname: this.$store.state.curUserName,
            curDepartment: '花季猫狗猪猪兔兔牛马丁真收容中心',
            curDepartmentId: '1',
            departmentList: [],
            chatLog: '',
            messageInput: '',
            chatSocket: null,
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            sys_message_url: "https://bpic.51yuansu.com/pic3/cover/03/59/43/5bd10c8228793_610.jpg?x-oss-process=image/sharpen,100",
            chatMessages: [
              { id: 1, content: "Hello", isSentByCurrentUser: true, user_name: 'Xenon' ,type: "message" },
              { id: 2, content: "Hi there", isSentByCurrentUser: false, user_name: 'sbWei' ,type: "message" },
              { id: 3, content: "How are you?", isSentByCurrentUser: true, user_name: 'Xenon' ,type: "message" },
              { id: 4, content: "I'm good, thanks!", isSentByCurrentUser: false, user_name: 'sbWei' ,type: "message" },
              { id: 3, content: "How are you?", isSentByCurrentUser: true, user_name: 'Xenon' ,type: "message" },
              { id: 4, content: "I'm good, thanks!", isSentByCurrentUser: false, user_name: 'sbWei' ,type: "message" },
              { id: 3, content: "How are you?", isSentByCurrentUser: true, user_name: 'Xenon' ,type: "message" },
              { id: 4, content: "I'm good, thanks!", isSentByCurrentUser: false, user_name: 'sbWei' ,type: "message" },
              { id: 3, content: "How are you?", isSentByCurrentUser: true, user_name: 'Xenon' ,type: "message" },
              { id: 4, content: "I'm good, thanks!", isSentByCurrentUser: false, user_name: 'sbWei' ,type: "message" },
            ],
            memberList: [
              {uid: 123, name: "Xenon" },
              {uid: 114, name: "wei" },
              {uid: 514, name: "Ding Zhen" },
              {uid: 12345, name: "Cary Zi" },
              {uid: 222222, name: "Pencil" },
            ],
            redDotNum: 10,
            hoverList: [
              { id: 1, hover: false },
              { id: 2, hover: false },
            ],
            historyVisible: false,
            atVisible: false,
            isAtAll: false,
            atList: [],

        };
    },
    mounted() {
        this.chatSocket = new WebSocket('ws://182.92.86.71:4514/ws/chat/1145/');
        this.chatSocket.onmessage = this.handleMessage;
        this.scrollToBottom();
        this.getDepartments();
    },
    updated() {
        this.scrollToBottom();
    },
    methods: {

        getDepartments(){
          //接口取企业
          const self = this;
          const dataObject = {
            tm_user_id: self.uid
          };
          const jsonString = JSON.stringify(dataObject);
          this.$api.chat.post_get_teams_for_user(jsonString)
            .then(function (response) {
                console.log(response);
                self.memberList.splice(0, self.departmentList.length);
                console.log(this.memberList);
            })
            .catch(function (error) {
                console.log(error);
            });

        },

        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        
        scrollToBottom() {
          this.$nextTick(function () {
            const container = document.querySelector('#scrollContainer');
            container.scrollTop = container.scrollHeight;
            container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
          });

        },
        handleAt(data) {
          // console.log(data);
          if(data.is_at_all === true || data.array_data.includes(this.uid))
          {
            console.log("你被@啦");
            
            const h = this.$createElement;

            this.$notify({
              title: '提醒',
              message: h('i', { style: 'color: teal'}, '你被@啦')
            });
          }
        },
        handleMessage(event) {  
          const data = JSON.parse(event.data);
          let recv_message_used = {
            content: data.message,
            isSentByCurrentUser: false,
            user_name: data.user_name
          }
          this.handleAt(data);
          // if(this.uid === data.user_id)
          // {
          //   return;
          // }

          if(typeof data.message === 'string') {
            this.chatMessages.push(recv_message_used);
          }
          else {
            const receivedArrayBuffer = data.message;
            
            console.log("1111")
            console.log(receivedArrayBuffer)
            const blob = new Blob([receivedArrayBuffer]);
            const file1 = new File([blob], 'aaa.py', { type: blob.type });

            // 在这里可以处理接收到的文件，例如保存到本地等
            console.log('接收到的文件:', file1);
            // 创建指向文件保存位置的链接
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(file1);
            downloadLink.download = 'aaa.py';

            // 触发文件下载和保存
            downloadLink.click();

            // 释放临时 URL
            URL.revokeObjectURL(downloadLink.href);
          }
        },

        handleEnter() {
          console.log('回车键被按下');
          this.sendMessage();
        },
        sendMessage() {
            if (this.messageInput === '\n' || this.messageInput === '') {
              this.messageInput = '';
              return;
            }
            const send_message = JSON.stringify({
                'message': this.messageInput,
                'user_id': this.uid,
                'user_name': this.uname,
                'is_at_all': this.isAtAll,
                'array_data': this.atList,
                'type': "message"
            })
            let send_message_used = {
              content: this.messageInput,
              isSentByCurrentUser: true 
            }

            // 将消息存至数据库

            this.chatMessages.push(send_message_used);
            this.chatSocket.send(send_message);
            this.messageInput = '';
            this.atList.splice(0, this.atList.length);
            this.isAtAll = false;
            
            // console.log(this.chatMessages)
            console.log("send success")
            },

            openFileManager() {
              this.$refs.fileInput.click();
            },
              send_file() {

                const selectedFile = event.target.files[0];
              // 在这里可以处理选中的文件，例如发送到服务器等
              console.log('选中的文件:', selectedFile);
              
              const reader = new FileReader();
              
              reader.onload = () => {
              const arrayBuffer = event.target.result; // 读取到的文件内容为 ArrayBuffer
              console.log(arrayBuffer);

              const send_message = JSON.stringify({
                    'message': binaryData,
                    'user_id': this.uid,
                    'user_name': this.uname,
                    'is_at_all': false,
                    'array_data': []
                })
              // WebSocket 成功连接后的回调函数
                this.chatSocket.send(send_message);
                console.log(send_message);
              }

              const h = this.$createElement;

              this.$notify({
                title: '发送文件',
                message: h('i', { style: 'color: teal'}, '文件已发送')
              });
            },
            isImageMessage(message) {
              // 假设图片消息的格式是以 "image:" 开头的字符串
              return message.content.startsWith("image:");
            },
            atMember(index) {
              // 传后端内容
              this.messageInput += `@${this.memberList[index].name} `;
              this.atList.push(this.memberList[index].uid);
              console.log(this.atList);
            },
            atAll() {
              this.isAtAll = true;
              this.messageInput += '@所有人 ';
            },
            openAtMenu() {
              const self = this;
              const dataObject = {
                team_id: 1,
                tm_user_id: 1
              };
              const jsonString = JSON.stringify(dataObject);
              this.$api.chat.post_get_team_members_and_permissions(jsonString)
                .then(function (response) {
                    console.log(response);
                    self.memberList.splice(0, self.memberList.length);
                    console.log(response.data.members);
                    response.data.members.forEach(element => {
                      const mem = {
                        uid: element.tm_user_id,
                        name: element.tm_user_nickname
                      }
                      console.log(mem);
                      self.memberList.push(mem);
                    });
                    console.log(this.memberList);
                })
                .catch(function (error) {
                    console.log(error);
                });
              // 调用接口更新memberList
            },
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
    margin-bottom: -900px;
    width: 500px !important;
    margin-left: 60px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    margin-right: 100px;
    height: 650px;
    overflow: auto;
  }
  .scrollContainer {
    height: 650px;
    // overflow: auto;
  }
  .scrollContainer::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px !important;
        background-color: skyblue !important;
        /*background-color: 0096c7 !important;*/
        background-image: -webkit-linear-gradient(
                45deg,
                rgba(255, 255, 255, 0.2) 25%,
                transparent 25%,
                transparent 50%,
                rgba(255, 255, 255, 0.2) 50%,
                rgba(255, 255, 255, 0.2) 75%,
                transparent 75%,
                transparent
        );
    }
    .scrollContainer::-webkit-scrollbar {
        width: 10px !important; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px !important;
    }
    .scrollContainer::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #ededed;
        border-radius: 10px;
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
  #icon-button {
    line-height: 50px;
  }
  .at {
    font-size: 30px;
    margin: -7px 45px 0 -36px;
    line-height: 50px;
  }
  .department-member {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    padding: 0 0 0 7px;
  }
  .el-popover {
    width: 300px !important;
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
  .department-container {
    margin-left: 35px;
    margin-top: 35px;
    overflow: auto;
  }
  .department {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    width: 420px;
    height: 100px;
    margin-left: 0px;
    transition: background-color 0.3s ease-out;
  }
  .department-hovered{
    background-color: #a3a3a3;
  }
  .department-avatar {
    margin-left: 18px;
    margin-top: 15px;
  }
  .department-avatar-red {
    margin-left: 18px;
    margin-top: 5px;
  }
  .department-name {
    font-size: 18px;
    margin-top: 12px;
  }
  .depertment-latest-message {
    font-size: 15px;
    margin-top: 30px;
    color: #717171;
  }
  .red_dot {
    margin-top: 10px;
    margin-right: 40px;
  }
  </style>