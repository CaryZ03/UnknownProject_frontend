<template>
  <div>
    <Navbar></Navbar>
    <el-container>
      <el-aside class="el-aside">
        <el-popover placement="bottom" width="300" v-model="historyCheckVisible" id="historyPop" class="historyPop">
          <p>查找聊天记录</p>
          <el-input placeholder="请输入内容" v-model="historyInput" clearable>
          </el-input>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="historyCheckVisible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="searchHistoryMessage">确定</el-button>
          </div>
          <div class="search-history" slot="reference">
            <el-row>
              <el-col :span="7" class="box">
                <i class="el-icon-search"></i>
              </el-col>
              <el-col :span="17">
                查找聊天记录
              </el-col>
            </el-row>
          </div>
        </el-popover>
        <div class="newChat">
          <el-button type="success" round><i class="el-icon-circle-plus"></i>新建群聊</el-button>
        </div>
        <div class="department-container">
          <div class="department" :class="{ 'department-hovered': hoverList[0].hover }"
            @mouseover="hoverList[0].hover = true" @mouseout="hoverList[0].hover = false" @click="checkSystemMessage">
            <el-row>
              <el-col :span="6">
                <el-badge :value="this.$store.state.notificationRedNum" class="red_dot"
                  v-if="this.$store.state.notificationRedNum > 0">
                  <el-avatar shape="square" :size="70" :src="sys_message_url" class="department-avatar-red"
                    v-if="this.$store.state.notificationRedNum > 0"></el-avatar>
                </el-badge>
                <el-avatar shape="square" :size="70" :src="sys_message_url" class="department-avatar" v-else></el-avatar>
              </el-col>
              <el-col :span="18">
                <div class="department-name">系统消息</div>
                <div class="depertment-latest-message">
                  Xenon: 收到的消息
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="SelectChat">
            <el-tabs v-model="activeSelectName">
              <el-tab-pane label="企业群聊" name="first">企业群聊
                <div v-for="(team, index) in departmentList" :key="index" :id="'generated-div-' + index"
                  class="department" :class="{ 'department-hovered': hoverList[index + 1].hover }"
                  @mouseover="hoverList[index + 1].hover = true" @mouseout="hoverList[index + 1].hover = false"
                  @click="checkTeamMessage(index)">
                  <el-row>
                    <el-col :span="6">
                      <el-badge :value="redDotNum[index + 1]" class="red_dot" v-if="redDotNum[index + 1] > 0">
                        <el-avatar shape="square" :size="70" :src="circleUrl" class="department-avatar-red"
                          v-if="redDotNum[index + 1] > 0"></el-avatar>
                      </el-badge>
                      <el-avatar shape="square" :size="70" :src="circleUrl" class="department-avatar" v-else></el-avatar>

                    </el-col>
                    <el-col :span="18">
                      <div class="department-name">{{ team.team_name }}</div>
                      <div class="depertment-latest-message">
                        Xenon: 收到的消息
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-tab-pane>
              <el-tab-pane label="多人群聊" name="second">多人群聊</el-tab-pane>
              <el-tab-pane label="私人聊天" name="third">私人聊天</el-tab-pane>
            </el-tabs>
          </div>
        </div>

      </el-aside>

      <el-container>
        <el-header>{{ this.curDepartment }}({{ this.memberList.length }})</el-header>
        <el-main id="scrollContainer" class="scrollContainer">
          <div>
            <div v-for="(message, index) in chatMessages" :key="index" :id="'div-' + index" :ref="'div-' + index">
              <div class="recv-message"
                v-if="message.isSentByCurrentUser === false && (typeof message.private_connect_id === 'undefined' || message.private_connect_id === uid || message.private_connect_id === 0)">
                <el-row>
                  <el-col :span="1">
                    <el-avatar v-if="message.user_name === '系统消息'" :src="sys_message_url"></el-avatar>
                    <el-avatar v-else :src="circleUrl"></el-avatar>
                  </el-col>
                  <el-col :span="23">
                    <div>{{ message.user_name }}</div>
                    <div v-if="message.message_type === 'image'" class="chat-bubble received">
                      <img :src="message.content" alt="接收的图片">
                    </div>
                    <div v-else-if="message.message_type === 'file'" class="chat-bubble received file"
                      @click="downloadFile(message)">
                      {{ message.content }}
                    </div>
                    <div v-else-if="message.user_name === '系统消息'" class="chat-bubble received">
                      <span>
                        <div>
                          {{ message.content }}
                        </div>
                        <el-button size="mini" round @click="skipToMessage(message.notification_id)">跳转至相应区域</el-button>
                        <el-button size="mini" round @click="changeToUnread">标记为未读</el-button>
                      </span>
                    </div>
                    <div v-else-if="message.private_connect_id === uid" class="chat-bubble received">
                      <span>
                        <div>
                          {{ message.content }}
                        </div>
                      </span>
                    </div>
                    <div v-else-if="message.hasOwnProperty('is_history')" class="chat-bubble received">
                      <span>
                        <div>
                          {{ message.content }}
                        </div>
                        <el-button size="mini" round @click="skipToHistoryMessage(message)">跳转至相应区域</el-button>
                      </span>
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
                    <div v-if="message.message_type === 'image'" class="chat-bubble sent">
                      <img :src="message.content" alt="发送的图片">
                    </div>
                    <div v-else-if="message.message_type === 'file'" class="chat-bubble sent file"
                      @click="downloadFile(message)">
                      {{ message.content }}
                    </div>
                    <div v-else-if="message.hasOwnProperty('is_history')" class="chat-bubble sent">
                      <span>
                        <div>
                          {{ message.content }}
                        </div>
                        <el-button size="mini" round @click="skipToHistoryMessage(message)">跳转至相应区域</el-button>
                      </span>
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
            <el-dialog title="历史记录" :visible.sync="historyVisible" width="30%" :before-close="handleClose"
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
              <el-popover placement="top" width="160" v-model="atVisible" id="atPop">
                <p>@成员</p>
                <div class="department-member" @click="atAll">所有人</div>
                <div v-for="(member, index) in memberList" :key="index" :id="'generated-div-' + index"
                  class="department-member" @click="atMember(index)">
                  {{ member.name }}
                </div>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="atVisible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="atVisible = false">确定</el-button>
                </div>
                <div class="at" slot="reference" @click="openMemberMenu">@</div>
              </el-popover>
            </el-col>
            <el-col :span="1">
              <el-popover placement="top" width="160" v-model="privateVisible" id="soloPop">
                <p>私聊成员</p>
                <div v-for="(member, index) in memberList" :key="index" :id="'generated-div-' + index"
                  class="department-member" @click="privateMember(index)">
                  {{ member.name }}
                </div>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="cancelPrivateChat">取消</el-button>
                  <el-button type="primary" size="mini" @click="privateVisible = false">确定</el-button>
                </div>
                <div class="solo" slot="reference">
                  <i class="el-icon-user-solid icon-set solo-chat" @click="openMemberMenu"></i>
                </div>
              </el-popover>
            </el-col>
            <el-col :span="19">

            </el-col>
          </el-row>


          <div class="inputArea">
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="messageInput" class="inputArea-body"
              @keyup.enter.native="handleEnter">
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
        { id: 1, content: "Hello", isSentByCurrentUser: true, user_name: 'Xenon', message_type: "message" },
        { id: 2, content: "Hi there", isSentByCurrentUser: false, user_name: 'sbWei', message_type: "message" },
        { id: 3, content: "How are you?", isSentByCurrentUser: true, user_name: 'Xenon', message_type: "message" },
        { id: 4, content: "I'm good, thanks!", isSentByCurrentUser: false, user_name: 'sbWei', message_type: "message" },
        { id: 3, content: "How are you?", isSentByCurrentUser: true, user_name: 'Xenon', message_type: "message" },
        { id: 4, content: "I'm good, thanks!", isSentByCurrentUser: false, user_name: 'sbWei', message_type: "message" },
        { id: 3, content: "How are you?", isSentByCurrentUser: true, user_name: 'Xenon', message_type: "message" },
        { id: 4, content: "I'm good, thanks!", isSentByCurrentUser: false, user_name: 'sbWei', message_type: "message" },
        { id: 3, content: "How are you?", isSentByCurrentUser: true, user_name: 'Xenon', message_type: "message" },
        { id: 4, content: "I'm good, thanks!", isSentByCurrentUser: false, user_name: 'sbWei', message_type: "message" },
      ],
      memberList: [
        { uid: 123, name: "Xenon" },
        { uid: 114, name: "wei" },
        { uid: 514, name: "Ding Zhen" },
        { uid: 12345, name: "Cary Zi" },
        { uid: 222222, name: "Pencil" },
      ],
      redDotNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      hoverList: [
        { id: 1, hover: false },
        { id: 2, hover: false },
        { id: 3, hover: false },
        { id: 4, hover: false },
        { id: 5, hover: false },
        { id: 6, hover: false },
        { id: 7, hover: false },
        { id: 8, hover: false },
        { id: 9, hover: false },
        { id: 10, hover: false },
        { id: 11, hover: false },
        { id: 12, hover: false },
      ],
      historyVisible: false,
      atVisible: false,
      privateVisible: false,
      isAtAll: false,
      atList: [],
      privateChatMember: 0,
      historyCheckVisible: false,
      historyInput: '',
      activeSelectName: 'first',
    };
  },
  mounted() {
    this.chatSocket = new WebSocket('ws://182.92.86.71:4514/ws/chat/104/');
    this.chatSocket.onmessage = this.handleMessge;
    this.scrollToBottom();
    this.getDepartments();
    this.check_profile_self();
  },
  updated() {
    // this.scrollToBottom();
  },
  methods: {
    check_profile_self() {
      const self = this;
      this.$api.user.post_check_profile_self()
        .then(function (response) {
          const user_info = JSON.parse(response.data.user_info);
          self.uid = user_info.user_id;
          self.uname = user_info.user_name;
          console.log(self.uid);
          console.log(self.uname);
          self.$store.state.curUserName = self.uname;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getDepartments() {
      //接口取企业
      const self = this;
      self.departmentList.splice(0, self.departmentList.length);
      const dataObject = {
        tm_user_id: self.uid
      };
      const jsonString = JSON.stringify(dataObject);
      this.$api.chat.post_get_teams_for_user(jsonString)
        .then(function (response) {
          self.departmentList.splice(0, self.departmentList.length);
          response.data.teams.forEach(element => {
            const team = {
              team_id: element.team_id,
              team_name: element.team_name
            }
            self.departmentList.push(team);
          });
        })
        .catch(function (error) {
          console.log(error);
        });

    },

    async checkSystemMessage() {
      this.chatMessages.splice(0, this.chatMessages.length);
      this.memberList.splice(0, this.memberList.length);
      this.curDepartment = '系统消息';
      this.$store.state.notificationRedNum = 0;
      const self = this;
      const dataObject = {
        user_id: self.uid
      };
      const jsonString = JSON.stringify(dataObject);
      this.$api.message.post_check_notification_list(jsonString)
        .then(function (response) {
          console.log(response)
          for (const item of response.data.notification_list_info) {
            const jsonObj = JSON.parse(item);
            const data = {
              content: jsonObj.notification_name + ", 点击此处查看",
              isSentByCurrentUser: false,
              user_name: "系统消息",
              message_type: "message",
              notification_id: jsonObj.notification_id,
              private_connect_id: jsonObj.private_connect_id
            }
            // console.log(jsonObj);
            self.chatMessages.push(data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      await this.sleep(500);
      self.scrollToBottom();
    },

    async checkTeamMessage(index) {
      this.redDotNum[index + 1] = 0;

      this.curDepartment = this.departmentList[index].team_name;
      this.curDepartmentId = this.departmentList[index].team_id;
      const self = this;
      const dataObject = {
        team_id: self.curDepartmentId,
        tm_user_id: self.uid
      };
      const jsonString = JSON.stringify(dataObject);
      // 加载企业成员
      this.$api.chat.post_get_team_members_and_permissions(jsonString)
        .then(function (response) {
          self.memberList.splice(0, self.memberList.length);
          response.data.members.forEach(element => {
            const mem = {
              uid: element.tm_user_id,
              name: element.tm_user_nickname
            }
            self.memberList.push(mem);
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      self.chatMessages.splice(0, self.chatMessages.length);
      const dataObject1 = {
        team_id: self.curDepartmentId,
      };
      const jsonString1 = JSON.stringify(dataObject1);
      this.$api.chat.post_get_team_chat_history(jsonString1)
        .then(function (response) {
          response.data.chat_history.forEach(element => {
            let isSentByCurrentUser_1 = false;
            const num = parseInt(self.uid)
            if (element.user_id === num) {
              isSentByCurrentUser_1 = true;
            }
            const message = {
              content: element.message,
              isSentByCurrentUser: isSentByCurrentUser_1,
              user_name: element.user_name,
              message_type: element.message_type,
              file_id: element.file_id,
              cm_id: element.cm_id,
              private_connect_id: element.private_connect_id
            }
            // console.log(message);
            self.chatMessages.push(message);
          });
          // console.log(self.chatMessages);
        })
        .catch(function (error) {
          console.log(error);
        });
      // console.log(self.curDepartmentId);
      await this.sleep(1700);
      self.scrollToBottom();
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
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
      if (data.is_at_all === true || data.array_data.includes(this.uid)) {
        console.log("你被@啦");

        const h = this.$createElement;

        this.$notify({
          title: '提醒',
          message: h('i', { style: 'color: teal' }, '你被@啦')
        });
      }
    },
    handleMessage(event) {
      const data = JSON.parse(event.data);
      let recv_message_used = {
        content: data.message,
        isSentByCurrentUser: false,
        user_name: data.user_name,
        message_type: data.message_type,
        file_id: data.file_id,
        private_connect_id: data.private_connect_id
      }
      if (this.uid === data.user_id) {
        return;
      }
      this.handleAt(data);

      this.chatMessages.push(recv_message_used);
    },

    handleEnter() {
      console.log('回车键被按下');
      this.sendMessage();
    },
    async sendMessage() {
      const self = this;
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
        'message_type': "message",
        'file_id': 0,
        'private_connect_id': this.privateChatMember
      })
      console.log(send_message);
      let send_message_used = {
        content: this.messageInput,
        isSentByCurrentUser: true,
        user_name: this.uname,
        message_type: "message",
        file_id: 0
      }

      // 将消息存至数据库

      const send_message_to_backend = JSON.stringify({
        'message': this.messageInput,
        'user_id': this.uid,
        'team_id': this.curDepartmentId,
        'is_at_all': this.isAtAll,
        'array_data': this.atList,
        'message_type': "message",
        'private_connect_id': this.privateChatMember
      })

      this.chatMessages.push(send_message_used);
      this.chatSocket.send(send_message);
      this.messageInput = '';



      let message_id = 1;
      this.$api.chat.post_store_message(send_message_to_backend)
        .then(function (response) {
          message_id = response.data.cm_id;
        })
        .catch(function (error) {
          console.log(error);
        });

      await this.sleep(2000);

      if (this.isAtAll === true || this.atList.length != 0) {
        console.log("消息处理")
        let receiver_list = [];
        if (this.isAtAll === true) {
          for (const member of this.memberList) {
            receiver_list.push(member.uid);
          }
        }
        else {
          for (const member of this.atList) {
            receiver_list.push(member);
          }
        }
        console.log("receiver_list: ", receiver_list)
        const id = parseInt(this.uid);
        const jsonString = JSON.stringify({
          'notification': {
            'name': "有人@了你",
            'content': "@@@",
            'creator_id': id,
            'type': 'at',
            'cm_id': message_id
          },
          'receiver_list': receiver_list
        })
        this.$api.message.post_group_send_notification_to_user(jsonString)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

      }

      this.atList.splice(0, this.atList.length);
      this.isAtAll = false;
      await self.sleep(1300);
      self.scrollToBottom();
      // console.log(this.chatMessages)
      console.log("send success")
    },

    openFileManager() {
      this.$refs.fileInput.click();
    },
    sleep(ms) {
      console.log("sleep");
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    async send_file(event) {
      const self = this;
      let file_id;
      const selectedFile = event.target.files[0];
      // 在这里可以处理选中的文件，例如发送到服务器等
      console.log('选中的文件:', selectedFile);
      const formData = new FormData();
      formData.append('file', selectedFile);

      this.$api.document.post_upload_file(formData)
        .then(function (response) {
          file_id = response.data.file_id;
          const send_message_file = JSON.stringify({
            'message': selectedFile.name,
            'user_id': self.uid,
            'user_name': self.uname,
            'is_at_all': self.isAtAll,
            'array_data': self.atList,
            'message_type': "file",
            'file_id': file_id,
            'private_connect_id': this.privateChatMember
          })


          let send_message_file_used = {
            content: selectedFile.name,
            isSentByCurrentUser: true,
            user_name: self.uname,
            message_type: "file",
            file_id: file_id
          }

          self.chatMessages.push(send_message_file_used);
          self.chatSocket.send(send_message_file);
        })

        .catch(function (error) {
          console.log(error);
        });
      await self.sleep(4000);
      const send_message_to_backend = JSON.stringify({
        'message': selectedFile.name,
        'user_id': self.uid,
        'team_id': self.curDepartmentId,
        'is_at_all': self.isAtAll,
        'array_data': self.atList,
        'message_type': "file",
        'file_id': file_id,
        'private_connect_id': this.privateChatMember
      })
      console.log(send_message_to_backend);
      this.$api.chat.post_store_message(send_message_to_backend)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      const h = this.$createElement;

      this.$notify({
        title: '发送文件',
        message: h('i', { style: 'color: teal' }, '文件已发送')
      });
    },

    async downloadFile(message) {
      console.log(message)
      const dataObject1 = {
        file_id: message.file_id,
      };
      const jsonString1 = JSON.stringify(dataObject1);
      this.$api.document.post_download_file(jsonString1)
        .then(function (response) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', message.content); // Replace with the actual file name
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);

        })
        .catch(function (error) {
          console.log(error);
        });
    },

    atMember(index) {
      // 传后端内容
      this.messageInput += `@${this.memberList[index].name} `;
      this.atList.push(this.memberList[index].uid);
      console.log(this.atList);
    },
    privateMember(index) {
      this.messageInput = `(私聊 ${this.memberList[index].name}) `;
      this.privateChatMember = this.memberList[index].uid;
      console.log(this.privateChatMember);
    },
    atAll() {
      this.isAtAll = true;
      this.messageInput += '@所有人 ';
    },
    openMemberMenu() {
      const self = this;
      const dataObject = {
        team_id: self.curDepartmentId,
        tm_user_id: self.uid
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


    changeToUnread() {
      this.$store.state.notificationRedNum += 1;
    },
    async skipToMessage(notification_id) {
      const self = this;
      let index = 0;
      let cm_id = 0;
      const dataObject = {
        notification_id: notification_id,
      };
      const jsonString = JSON.stringify(dataObject);
      this.$api.message.post_skip_info(jsonString)
        .then(function (response) {
          console.log(response);
          for (var i = 0; i < self.departmentList.length; i++) {
            if (self.departmentList[i].team_id === response.data.team_id) {
              index = i;
              cm_id = response.data.cm_id;
              console.log(i);
              console.log(response.data.cm_id);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      await self.sleep(1500);

      self.checkTeamMessage(index);
      await self.sleep(1500);
      console.log(cm_id);
      let index_chat = 0;
      for (var i = 0; i < self.chatMessages.length; i++) {
        if (self.chatMessages[i].cm_id == cm_id) {
          index_chat = i;
        }
      }
      await self.sleep(1500);
      const divElement = document.getElementById('div-' + index_chat);

      console.log(divElement);
      divElement.scrollIntoView({ behavior: 'smooth' });  // 滚动到指定div的位置
    },
    cancelPrivateChat() {
      this.privateVisible = false;
      this.messageInput = '';
      this.privateChatMember = 0;
    },
    async searchHistoryMessage() {
      const self = this;
      const dataObject = {
        tm_user_id: self.uid,
        search_info: self.historyInput
      };
      const jsonString = JSON.stringify(dataObject);
      this.$api.chat.post_search_chat_message(jsonString)
        .then(function (response) {
          console.log(response);

          // 绘制聊天记录
          self.curDepartment = '聊天记录';
          self.curDepartmentId = 0;
          self.chatMessages.splice(0, self.chatMessages.length);
          response.data.search_res.forEach(element => {
            let isSentByCurrentUser_1 = false;
            const num = parseInt(self.uid);
            if (element.message_sender_id === num) {
              isSentByCurrentUser_1 = true;
            }
            const message = {
              content: element.message_content,
              isSentByCurrentUser: isSentByCurrentUser_1,
              user_name: element.message_sender_name,
              message_type: element.message_type,
              file_id: element.file_id,
              cm_id: element.cm_id,
              private_connect_id: element.private_connect_id,
              is_history: true,
              team_id: element.team_id
            }
            self.chatMessages.push(message);
          });

        })
        .catch(function (error) {
          console.log(error);
        });
      await this.sleep(1300);
      self.scrollToBottom();
    },
    async skipToHistoryMessage(message) {
      const self = this;
      let index = 0;
      let cm_id = 0;
      console.log(message);
      for (var i = 0; i < self.departmentList.length; i++) {
        if (self.departmentList[i].team_id === message.team_id) {
          index = i;
          cm_id = message.cm_id;
          console.log(i);
          console.log(message.cm_id);
        }
      }

      self.checkTeamMessage(index);
      await self.sleep(1500);
      let index_chat = 0;
      for (var i = 0; i < self.chatMessages.length; i++) {
        if (self.chatMessages[i].cm_id == cm_id) {
          index_chat = i;
        }
      }
      await self.sleep(1500);
      console.log(index_chat);
      const divElement = document.getElementById('div-' + index_chat);

      console.log(divElement);
      divElement.scrollIntoView({ behavior: 'smooth' });  // 滚动到指定div的位置
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
  background-image: -webkit-linear-gradient(45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent);
}

.scrollContainer::-webkit-scrollbar {
  width: 10px !important;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px !important;
}

.scrollContainer::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}

body>.el-container {
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

.inputArea-body {
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

.department-hovered {
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

.file {
  padding: 50px;
}

.solo-chat {
  margin: 0 10px 0 -49px;
}

.search-history {
  background-color: #cfd4d7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  font-size: 20px;
  color: #989898;
  margin: 50px 116px 0 120px;
  border-radius: 4px;
}

.box {
  text-align: right;
}

.historyPop {
  padding: 50px !important;
}
.SelectChat {
  margin: 0 46px 0 0px;
}
.newChat {
  text-align: center;
}
</style>