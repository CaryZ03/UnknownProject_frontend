<template>
  <div class="background">
    <Navbar></Navbar>
    <el-container>
      <el-aside class="el-aside">
        <el-popover placement="bottom" width="300" v-model="historyCheckVisible" id="historyPop" class="historyPop">
          <p>查找聊天记录</p>
          <div style="margin-bottom: 20px">
            <el-radio-group v-model="searchType" size="small">
              <el-radio-button label="企业群聊"></el-radio-button>
              <el-radio-button label="多人群聊"></el-radio-button>
              <el-radio-button label="个人聊天"></el-radio-button>
            </el-radio-group>
          </div>
          <el-input placeholder="请输入内容" v-model="historyInput" clearable style="margin-bottom: 20px">
          </el-input>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="historyCheckVisible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="searchHistoryMessage"
              v-if="searchType === '企业群聊'">确定</el-button>
            <el-button type="primary" size="mini" @click="searchGroupHistoryMessage"
              v-else-if="searchType === '多人群聊'">确定</el-button>
            <el-button type="primary" size="mini" @click="searchPrivateHistoryMessage"
              v-else-if="searchType === '个人聊天'">确定</el-button>
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
          <el-button type="success" round @click="createChatVisible = true"><i
              class="el-icon-circle-plus"></i>新建群聊</el-button>
        </div>
        <el-dialog title="新建群聊" :visible.sync="createChatVisible" width="30%" :before-close="handleClose">
          <el-form ref="createChatForm" :model="createChatForm" label-width="80px">
            <el-form-item label="群聊名称">
              <el-input v-model="createChatForm.chatGroupName"></el-input>
            </el-form-item>
            <el-form-item label="群聊成员">
              <el-select v-model="createChatForm.chatGroupMember" multiple placeholder="请选择群聊成员">
                <el-option v-for="item in memberList" :key="item.uid" :label="item.name" :value="item.uid"
                  :disabled="item.uid === uid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="createChatVisible = false">取 消</el-button>
            <el-button type="primary" @click="createGroupChat">确 定</el-button>
          </span>
        </el-dialog>
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
            <el-tabs v-model="activeSelectName" class="select-tab">
              <el-tab-pane label="企业群聊" name="first">企业群聊
                <div v-for="(team, index) in departmentList" :key="index" :id="'generated-div-' + index"
                  class="department" :class="{ 'department-hovered': hoverList[index + 1].hover }"
                  @mouseover="hoverList[index + 1].hover = true" @mouseout="hoverList[index + 1].hover = false"
                  @click="checkTeamMessage(index)">
                  <el-row>
                    <el-col :span="6">
                      <el-avatar shape="square" :size="70" class="department-avatar"
                        v-if="teamRedDotNum[index] === 0 || isInTheChat[index] === true">
                        {{ getInitials(team.team_name) }}
                      </el-avatar>
                      <el-badge :value="teamRedDotNum[index]" class="red_dot" v-else-if="teamRedDotNum[index] > 0">
                        <el-avatar shape="square" :size="70" class="department-avatar-red"
                          v-if="teamRedDotNum[index] > 0">
                          {{ getInitials(team.team_name) }}
                        </el-avatar>
                      </el-badge>


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
              <el-tab-pane label="创建的群聊" name="second">
                创建的群聊
                <div v-for="(group, index) in createGroupChatList" :key="index" :id="'generated-group-div-' + index"
                  class="department" :class="{ 'department-hovered': hoverList[index + 1].hover }"
                  @mouseover="hoverList[index + 1].hover = true" @mouseout="hoverList[index + 1].hover = false"
                  @click="checkGroupMessage(index)">
                  <el-row>
                    <el-col :span="6">
                      <el-avatar shape="square" :size="70" class="department-avatar"
                        v-if="createGroupRedDotNum[index] === 0 || isInTheChat[index] === true">
                        {{ getInitials(group.gc_name) }}
                      </el-avatar>
                      <el-badge :value="createGroupRedDotNum[index]" class="red_dot"
                        v-else-if="createGroupRedDotNum[index] > 0">
                        <el-avatar shape="square" :size="70" class="department-avatar-red"
                          v-if="createGroupRedDotNum[index] > 0">
                          {{ getInitials(group.gc_name) }}
                        </el-avatar>
                      </el-badge>

                    </el-col>
                    <el-col :span="18">
                      <div class="department-name">{{ group.gc_name }}</div>
                      <div class="depertment-latest-message">
                        Xenon: 收到的消息
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-tab-pane>
              <el-tab-pane label="加入的群聊" name="third">
                加入的群聊
                <div v-for="(group, index) in joinGroupChatList" :key="index" :id="'generated-group-div-' + index"
                  class="department" :class="{ 'department-hovered': hoverList[index + 1].hover }"
                  @mouseover="hoverList[index + 1].hover = true" @mouseout="hoverList[index + 1].hover = false"
                  @click="checkGroupMessage(index)">
                  <el-row>
                    <el-col :span="6">
                      <el-avatar shape="square" :size="70" class="department-avatar"
                        v-if="joinGroupRedDotNum[index] === 0 || isInTheChat[index] === true">
                        {{ getInitials(group.gc_name) }}
                      </el-avatar>
                      <el-badge :value="joinGroupRedDotNum[index]" class="red_dot"
                        v-else-if="joinGroupRedDotNum[index] > 0">
                        <el-avatar shape="square" :size="70" class="department-avatar-red"
                          v-if="joinGroupRedDotNum[index] > 0">
                          {{ getInitials(group.gc_name) }}
                        </el-avatar>
                      </el-badge>

                    </el-col>
                    <el-col :span="18">
                      <div class="department-name">{{ group.gc_name }}</div>
                      <div class="depertment-latest-message">
                        Xenon: 收到的消息
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-tab-pane>
              <el-tab-pane label="私人聊天" name="forth">私人聊天
                <div v-for="(person, index) in privateChatList" :key="index" :id="'generated-person-div-' + index"
                  class="department" :class="{ 'department-hovered': hoverList[index + 1].hover }"
                  @mouseover="hoverList[index + 1].hover = true" @mouseout="hoverList[index + 1].hover = false"
                  @click="checkPrivateMessage(index)">
                  <el-row>
                    <el-col :span="6">
                      <el-avatar shape="square" :size="70" class="department-avatar"
                        v-if="privateRedDotNum[index] === 0 || isInTheChat[index] === true">
                        {{ getInitials(person.user_name) }}
                      </el-avatar>
                      <el-badge :value="privateRedDotNum[index]" class="red_dot" v-else-if="privateRedDotNum[index] > 0">
                        <el-avatar shape="square" :size="70" class="department-avatar-red"
                          v-if="privateRedDotNum[index] > 0">
                          {{ getInitials(person.user_name) }}
                        </el-avatar>
                      </el-badge>

                    </el-col>
                    <el-col :span="18">
                      <div class="department-name">{{ person.user_name }}</div>
                      <div class="depertment-latest-message">
                        Xenon: 收到的消息
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>

      </el-aside>

      <el-container>
        <el-header v-if="isRelayMode">
          <el-row>
            <el-col :span="21">
              <div v-if="isPrivateChat">
                {{ this.curDepartment }}(私聊)
              </div>
              <div v-else>
                {{ this.curDepartment }}({{ this.memberList.length }})
              </div>
            </el-col>
            <el-col :span="2">
              <el-button icon="el-icon-close" circle v-if="isRelayMode" type="danger" @click="closeRelayMode"></el-button>
              <el-button icon="el-icon-check" circle v-if="isRelayMode" type="success"
                @click="outerVisible = true"></el-button>
            </el-col>
            <div>
            </div>
            <el-col :span="1">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-button icon="el-icon-more-outline" circle v-if="isInCreateGroup"></el-button>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <div @click="inviteVisible = true">
                      邀请成员
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="deleteVisible = true">
                      删除成员
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item class="delete-group">
                    <div @click="deleteGroupVisible = true">
                      解散群聊
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
        <el-header v-else>
          <el-row>
            <el-col :span="23">
              <div v-if="isPrivateChat">
                {{ this.curDepartment }}(私聊)
              </div>
              <div v-else>
                {{ this.curDepartment }}({{ this.memberList.length }})
              </div>
            </el-col>
            <el-col :span="1">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-button icon="el-icon-more-outline" circle v-if="isInCreateGroup"></el-button>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <div @click="inviteVisible = true">
                      邀请成员
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="deleteVisible = true">
                      删除成员
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item class="delete-group">
                    <div @click="deleteGroupVisible = true">
                      解散群聊
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>

        <el-dialog title="邀请成员" :visible.sync="inviteVisible" width="30%" :before-close="handleClose">
          <el-select v-model="inviteMemberList" multiple placeholder="请选择群聊成员">
            <el-option v-for="item in departmentMemberList" :key="item.uid" :label="item.name" :value="item.uid"
              :disabled="memberList.find(obj => obj.uid === item.uid && obj.name === item.name) !== undefined">
            </el-option>
          </el-select>
          <span slot="footer" class="dialog-footer">
            <el-button @click="inviteVisible = false">取 消</el-button>
            <el-button type="primary" @click="inviteMember">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="删除成员" :visible.sync="deleteVisible" width="30%" :before-close="handleClose">
          <el-select v-model="deleteMemberList" multiple placeholder="请选择删除的群聊成员">
            <el-option v-for="item in memberList" :key="item.uid" :label="item.name" :value="item.uid">
            </el-option>
          </el-select>
          <span slot="footer" class="dialog-footer">
            <el-button @click="deleteVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteMember">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="解散群聊" :visible.sync="deleteGroupVisible" width="30%" :before-close="handleClose">
          <span>确定要解散群聊吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="deleteGroupVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteGroup">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="选择转发方式" :visible.sync="outerVisible" width="20%">
          <el-dialog width="27%" title="转发到聊天" :visible.sync="innerVisible" append-to-body>
            <el-tabs v-model="activeSelectName">
              <el-tab-pane label="企业群聊" name="first">
                企业群聊
                <div class="relayDiv">
                  <div v-for="(team, index) in departmentList" :key="index" :id="'generated-div-' + index"
                    class="department" :class="{ 'department-hovered': hoverList[index + 1].hover }"
                    @mouseover="hoverList[index + 1].hover = true" @mouseout="hoverList[index + 1].hover = false"
                    @click="handleRelay(index)">
                    <el-row>
                      <el-col :span="6">
                        <el-badge :value="teamRedDotNum[index]" class="red_dot" v-if="teamRedDotNum[index] > 0">
                          <el-avatar shape="square" :size="70" class="department-avatar-red"
                            v-if="teamRedDotNum[index] > 0">
                            {{ getInitials(team.team_name) }}
                          </el-avatar>
                        </el-badge>
                        <el-avatar shape="square" :size="70" class="department-avatar" v-else>
                          {{ getInitials(team.team_name) }}
                        </el-avatar>

                      </el-col>
                      <el-col :span="18">
                        <div class="department-name">{{ team.team_name }}</div>
                        <div class="depertment-latest-message">
                          Xenon: 收到的消息
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="创建的群聊" name="second">
                创建的群聊
                <div class="relayDiv">
                  <div v-for="(group, index) in createGroupChatList" :key="index" :id="'generated-group-div-' + index"
                    class="department" :class="{ 'department-hovered': hoverList[index + 1].hover }"
                    @mouseover="hoverList[index + 1].hover = true" @mouseout="hoverList[index + 1].hover = false"
                    @click="handleRelay(index)">
                    <el-row>
                      <el-col :span="6">
                        <el-badge :value="createGroupRedDotNum[index]" class="red_dot"
                          v-if="createGroupRedDotNum[index] > 0">
                          <el-avatar shape="square" :size="70" class="department-avatar-red"
                            v-if="createGroupRedDotNum[index] > 0">
                            {{ getInitials(group.gc_name) }}
                          </el-avatar>
                        </el-badge>
                        <el-avatar shape="square" :size="70" class="department-avatar" v-else>
                          {{ getInitials(group.gc_name) }}
                        </el-avatar>

                      </el-col>
                      <el-col :span="18">
                        <div class="department-name">{{ group.gc_name }}</div>
                        <div class="depertment-latest-message">
                          Xenon: 收到的消息
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="加入的群聊" name="third">
                加入的群聊
                <div class="relayDiv">
                  <div v-for="(group, index) in joinGroupChatList" :key="index" :id="'generated-group-div-' + index"
                    class="department" :class="{ 'department-hovered': hoverList[index + 1].hover }"
                    @mouseover="hoverList[index + 1].hover = true" @mouseout="hoverList[index + 1].hover = false"
                    @click="handleRelay(index)">
                    <el-row>
                      <el-col :span="6">
                        <el-badge :value="joinGroupRedDotNum[index]" class="red_dot" v-if="joinGroupRedDotNum[index] > 0">
                          <el-avatar shape="square" :size="70" class="department-avatar-red"
                            v-if="joinGroupRedDotNum[index] > 0">
                            {{ getInitials(group.gc_name) }}
                          </el-avatar>
                        </el-badge>
                        <el-avatar shape="square" :size="70" class="department-avatar" v-else>
                          {{ getInitials(group.gc_name) }}
                        </el-avatar>

                      </el-col>
                      <el-col :span="18">
                        <div class="department-name">{{ group.gc_name }}</div>
                        <div class="depertment-latest-message">
                          Xenon: 收到的消息
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="私人聊天" name="forth">
                私人聊天
                <div class="relayDiv">
                  <div v-for="(person, index) in privateChatList" :key="index" :id="'generated-person-div-' + index"
                    class="department" :class="{ 'department-hovered': hoverList[index + 1].hover }"
                    @mouseover="hoverList[index + 1].hover = true" @mouseout="hoverList[index + 1].hover = false"
                    @click="handleRelay(index)">
                    <el-row>
                      <el-col :span="6">
                        <el-badge :value="privateRedDotNum[index]" class="red_dot" v-if="privateRedDotNum[index] > 0">
                          <el-avatar shape="square" :size="70" class="department-avatar-red"
                            v-if="privateRedDotNum[index] > 0">
                            {{ getInitials(person.user_name) }}
                          </el-avatar>
                        </el-badge>
                        <el-avatar shape="square" :size="70" class="department-avatar" v-else>
                          {{ getInitials(person.user_name) }}
                        </el-avatar>

                      </el-col>
                      <el-col :span="18">
                        <div class="department-name">{{ person.user_name }}</div>
                        <div class="depertment-latest-message">
                          Xenon: 收到的消息
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-dialog>
          <el-select v-model="selectedRelayMethodOptions" placeholder="请选择">
            <el-option v-for="item in relayMethodOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <div slot="footer" class="dialog-footer">
            <el-button @click="outerVisible = false">取 消</el-button>
            <el-button type="primary" @click="innerVisible = true">确 定</el-button>
          </div>
        </el-dialog>

        <el-main id="scrollContainer" class="scrollContainer">
          <div>
            <div v-for="(message, index) in chatMessages" :key="index" :id="'div-' + index" :ref="'div-' + index">
              <div v-if="isRelayMode">
                <el-checkbox @change="handleCheckboxChange(index)"></el-checkbox>
              </div>
              <div class="recv-message"
                v-if="message.isSentByCurrentUser === false && (typeof message.private_connect_id === 'undefined' || message.private_connect_id === uid || message.private_connect_id === 0)">
                <el-row>
                  <el-col :span="1">
                    <el-avatar v-if="message.user_name === '系统消息'" :src="sys_message_url"></el-avatar>
                    <el-avatar v-else>
                      {{ getInitials(message.user_name) }}
                    </el-avatar>
                  </el-col>
                  <el-col :span="23">
                    <div>{{ message.user_name }}</div>
                    <div v-if="message.hasOwnProperty('is_history')" class="chat-bubble received">
                      <span>
                        <div>
                          {{ message.content }}
                        </div>
                        <el-button size="mini" round @click="skipToHistoryMessage(message)"
                          v-if="searchType === '企业群聊'">跳转至相应区域</el-button>
                        <el-button size="mini" round @click="skipToGroupHistoryMessage(message)"
                          v-if="searchType === '多人群聊'">跳转至相应区域</el-button>
                        <el-button size="mini" round @click="skipToChatHistoryMessage(message)"
                          v-if="searchType === '个人聊天'">跳转至相应区域</el-button>
                      </span>
                    </div>
                    <div v-else-if="message.message_type === 'image'" class="chat-bubble received">
                      <img :src="message.content" alt="接收的图片">
                    </div>
                    <div v-else-if="message.message_type === 'file'" class="chat-bubble received file"
                      @click="downloadFile(message)">
                      {{ message.content }}
                    </div>
                    <div v-else-if="message.message_type === 'block'" class="chat-bubble received file"
                      @click="loadRelayMessage(message.content)">
                      {{ message.content.split(",")[0] }}条聊天记录
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
                    <div v-if="message.hasOwnProperty('is_history')" class="chat-bubble sent">
                      <span>
                        <div>
                          {{ message.content }}
                        </div>
                        <el-button size="mini" round @click="skipToHistoryMessage(message)"
                          v-if="searchType === '企业群聊'">跳转至相应区域</el-button>
                        <el-button size="mini" round @click="skipToGroupHistoryMessage(message)"
                          v-if="searchType === '多人群聊'">跳转至相应区域</el-button>
                        <el-button size="mini" round @click="skipToChatHistoryMessage(message)"
                          v-if="searchType === '个人聊天'">跳转至相应区域</el-button>
                      </span>
                    </div>
                    <div v-else-if="message.message_type === 'image'" class="chat-bubble sent">
                      <img :src="message.content" alt="发送的图片">
                    </div>
                    <div v-else-if="message.message_type === 'file'" class="chat-bubble sent file"
                      @click="downloadFile(message)">
                      {{ message.content }}
                    </div>
                    <div v-else-if="message.message_type === 'block'" class="chat-bubble sent file"
                      @click="loadRelayMessage(message.content)">
                      {{ message.content.split(",")[0] }}条聊天记录
                    </div>
                    <div v-else class="chat-bubble sent">
                      {{ message.content }}
                    </div>
                  </el-col>
                  <el-col :span="1">
                    <el-avatar>{{ getInitials(uname) }}</el-avatar>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>

          <!-- 文件框 -->
          <div>
            <input type="file" ref="fileInput" style="display: none" @change="send_file">
          </div>
          <div>
            <input type="file" ref="imageInput" style="display: none" @change="send_image">
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
            <el-col :span="2">
              <div class="file-two">
                <i class="el-icon-folder-opened icon-set" @click="openFileManager"></i>
                <i class="el-icon-picture icon-set" @click="openImageManager"></i>
              </div>
            </el-col>
            <el-col :span="1">
              <el-popover placement="top" width="160" v-model="privateVisible_first" id="soloPop">
                <p>创建私人聊天
                </p>
                <div v-for="(member, index) in memberList" :key="index" :id="'generated-div-' + index"
                  class="department-member" @click="createPrivateChat(index)">
                  {{ member.name }}
                </div>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="privateVisible_first = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="privateVisible_first = false">确定</el-button>
                </div>
                <div class="private" slot="reference">
                  <i class="el-icon-s-custom icon-set" @click="openMemberMenu"></i>
                </div>
              </el-popover>
            </el-col>
            <el-col :span="1">
              <el-popover placement="top" width="160" v-model="atVisible" id="atPop">
                <p>@成员</p>
                <div class="department-member" @click="atAll" v-if="is_creator_or_manager">所有人</div>
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
                <p>悄悄话</p>
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
            <el-col :span="1">
              <div class="solo">
                <i class="el-icon-s-promotion icon-set relay" @click="isRelayMode = true"></i>
              </div>
            </el-col>
            <el-col :span="18">
            </el-col>
          </el-row>

          <div class="inputArea" v-if="activeSelectName === 'second' || activeSelectName === 'third'">
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="messageInput" class="inputArea-body"
              @keyup.enter.native="handleEnterGroup">
            </el-input>
            <el-button type="success" plain class="send-button" @click="sendGroupMessage">发送</el-button>
          </div>
          <div class="inputArea" v-else-if="isPrivateChat === false">
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="messageInput" class="inputArea-body"
              @keyup.enter.native="handleEnter">
            </el-input>
            <el-button type="success" plain class="send-button" @click="sendMessage">发送</el-button>
          </div>
          <div class="inputArea" v-else>
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="messageInput" class="inputArea-body"
              @keyup.enter.native="handleEnterPrivate">
            </el-input>
            <el-button type="success" plain class="send-button" @click="sendPrivateMessage">发送</el-button>
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
      uid: 1,
      uname: '',
      curDepartment: '花季猫狗猪猪兔兔牛马丁真收容中心',
      curDepartmentId: 0,
      departmentList: [],
      chatLog: '',
      messageInput: '',
      chatSocket: null,
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
      teamRedDotNum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      createGroupRedDotNum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      joinGroupRedDotNum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      privateRedDotNum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      isInTheChat: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
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
      privateVisible_first: false,
      privateChatList: [],
      isPrivateChat: false,
      curPrivateID: 0,
      createChatVisible: false,
      createChatForm: {
        chatGroupName: '',
        chatGroupMember: [],
      },
      createGroupChatList: [],
      joinGroupChatList: [],
      is_creator_or_manager: false,
      searchType: '企业群聊',
      isInCreateGroup: false,
      departmentMemberList: [],
      inviteVisible: false,
      inviteMemberList: [],
      deleteVisible: false,
      deleteMemberList: [],
      deleteGroupVisible: false,
      relayVisible: false,
      isRelayMode: false,
      relayMessage: [],
      outerVisible: false,
      innerVisible: false,
      relayMethodOptions: [{
        value: '逐条转发',
        label: '逐条转发'
      }, {
        value: '合并转发',
        label: '合并转发'
      }],
      selectedRelayMethodOptions: '逐条转发',
      chat_type: 'team_chat',
      timer: null,
      teamRedWebSocket: [null, null, null, null, null, null, null, null, null, null],
      createGroupRedWebSocket: [null, null, null, null, null, null, null, null, null, null],
      joinGroupRedWebSocket: [null, null, null, null, null, null, null, null, null, null],
      privateRedWebSocket: [null, null, null, null, null, null, null, null, null, null],
      curentChatIndex: 0,

    };
  },
  mounted() {
    this.scrollToBottom();
    this.check_profile_self();
    this.getDepartments();
    this.getPrivateChat();
    this.getGroupChat();
    this.checkSystemMessage();
    this.createRedWebSocket();
    // this.startTimer();
  },
  updated() {
    // this.scrollToBottom();
  },
  beforeDestroy() {
    // this.stopTimer();
  },
  methods: {
    async createRedWebSocket() {
      await this.sleep(2000);
      const self = this;
      self.departmentList.forEach((element, index) => {
        // console.log("abc11111");
        // console.log(element.team_id);
        const socketURL = 'ws://182.92.86.71:4514/ws/red/' + '1' + index + '/';
        // console.log("socketURL: " + socketURL);
        self.teamRedWebSocket[index] = new WebSocket(socketURL);
        self.teamRedWebSocket[index].onmessage = self.handleRed;
      });
      self.createGroupChatList.forEach((element, index) => {
        // console.log("abc11111");
        // console.log(element.team_id);
        const socketURL = 'ws://182.92.86.71:4514/ws/red/' + '2' + index + '/';
        // console.log("socketURL: " + socketURL);
        self.createGroupRedWebSocket[index] = new WebSocket(socketURL);
        self.createGroupRedWebSocket[index].onmessage = self.handleRed;
      });
      self.joinGroupChatList.forEach((element, index) => {
        // console.log("abc11111");
        // console.log(element.team_id);
        const socketURL = 'ws://182.92.86.71:4514/ws/red/' + '3' + index + '/';
        // console.log("socketURL: " + socketURL);
        self.joinGroupRedWebSocket[index] = new WebSocket(socketURL);
        self.joinGroupRedWebSocket[index].onmessage = self.handleRed;
      });
      self.privateChatList.forEach((element, index) => {
        // console.log("abc11111");
        // console.log(element.team_id);
        const socketURL = 'ws://182.92.86.71:4514/ws/red/' + '4' + index + '/';
        // console.log("socketURL: " + socketURL);
        self.privateRedWebSocket[index] = new WebSocket(socketURL);
        self.privateRedWebSocket[index].onmessage = self.handleRed;
      });
      console.log(self.teamRedWebSocket);
      console.log(self.createGroupRedWebSocket);
      console.log(self.joinGroupRedWebSocket);
      console.log(self.privateRedWebSocket);
    },
    sendRed(index){
      let sendString = '';
      if(this.activeSelectName === 'first')
      {
        sendString += '1';
        sendString += index;
        const send_message_to_backend = JSON.stringify({
          'room_id': sendString,
        })
        this.teamRedWebSocket[index].send(send_message_to_backend);
      }
      else if(this.activeSelectName === 'second')
      {
        sendString += '2';
        sendString += index;
        const send_message_to_backend = JSON.stringify({
          'room_id': sendString,
        })
        this.createGroupRedWebSocket[index].send(send_message_to_backend);
      }
      else if(this.activeSelectName === 'third')
      {
        sendString += '3';
        sendString += index;
        const send_message_to_backend = JSON.stringify({
          'room_id': sendString,
        })
        this.joinGroupRedWebSocket[index].send(send_message_to_backend);
      }
      else if(this.activeSelectName === 'forth')
      {
        sendString += '4';
        sendString += index;
        const send_message_to_backend = JSON.stringify({
          'room_id': sendString,
        })
        this.privateRedWebSocket[index].send(send_message_to_backend);
      }
      console.log("Send red success");
    },
    handleRed(event) {
      const data = JSON.parse(event.data);
      // console.log(event);
      console.log(data.room_id);
      const chat_type = parseInt(data.room_id[0]);
      const chat_index = parseInt(data.room_id.slice(1));
      console.log(chat_type);
      console.log(chat_index);
      if(chat_type === 1)
      {
        this.teamRedDotNum[chat_index] += 1;
      }
      else if(chat_type === 2)
      {
        this.createGroupRedDotNum[chat_index] += 1;
      }
      else if(chat_type === 3)
      {
        this.joinGroupRedDotNum[chat_index] += 1;
      }
      else if(chat_type === 4)
      {
        this.privateRedDotNum[chat_index] += 1;
      }
      console.log(this.teamRedDotNum);
      console.log(this.createGroupRedDotNum);
      console.log(this.joinGroupRedDotNum);
      console.log(this.privateRedDotNum);
    },
    async check_profile_self() {
      const self = this;
      await this.$api.user.post_check_profile_self()
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
      console.log("uid" + self.uid);
    },
    async getDepartments() {
      const self = this;
      //接口取企业
      await self.sleep(1500);
      self.departmentList.splice(0, self.departmentList.length);
      const dataObject = {
        tm_user_id: self.uid
      };
      console.log(dataObject)
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
    async getGroupChat() {
      const self = this;
      //接口取企业
      await self.sleep(1500);
      self.createGroupChatList.splice(0, self.createGroupChatList.length);
      self.joinGroupChatList.splice(0, self.joinGroupChatList.length);
      const dataObject = {
        user_id: self.uid
      };
      console.log(dataObject)
      const jsonString = JSON.stringify(dataObject);
      this.$api.chat.post_acquire_group_chat(jsonString)
        .then(function (response) {
          console.log("response11111");
          console.log(response)
          self.createGroupChatList.splice(0, self.createGroupChatList.length);
          response.data.group_chats_info_creator.forEach(element => {
            const group = {
              gc_id: element.gc_id,
              gc_name: element.gc_name,
              team_id: element.team_id
            }
            self.createGroupChatList.push(group);
          });
          response.data.group_chats_info_joiner.forEach(element => {
            const group = {
              gc_id: element.gc_id,
              gc_name: element.gc_name,
              team_id: element.team_id
            }
            self.joinGroupChatList.push(group);
          });
        })
        .catch(function (error) {
          console.log(error);
        });

    },

    async checkSystemMessage() {
      // if (this.curDepartmentId !== 0) {
      //   this.updateLeaveMessage();
      // }
      this.curDepartmentId = 0;
      this.isInCreateGroup = false;
      this.isPrivateChat = false;
      this.chatMessages.splice(0, this.chatMessages.length);
      this.memberList.splice(0, this.memberList.length);
      this.curDepartment = '系统消息';
      this.$store.state.notificationRedNum = 0;
      const self = this;
      const dataObject = {
        user_id: self.uid
      };
      const jsonString = JSON.stringify(dataObject);
      await this.$api.message.post_check_notification_list(jsonString)
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
      self.scrollToBottom();
    },

    async checkTeamMessage(index) {
      // if (this.curDepartmentId !== 0) {
      //   this.updateLeaveMessage();
      // }
      for (let i = 0; i < this.isInTheChat.length; i++) {
        this.isInTheChat[i] = false;
      }
      this.isInTheChat[index] = true;
      this.chat_type = 'team_chat';
      this.isInCreateGroup = false;
      this.isPrivateChat = false;
      this.teamRedDotNum[index] = 0;
      this.curentChatIndex = index;

      this.curDepartment = this.departmentList[index].team_name;
      this.curDepartmentId = this.departmentList[index].team_id;
      const self = this;
      const dataObject = {
        team_id: self.curDepartmentId,
        tm_user_id: self.uid
      };
      if (this.chatSocket !== null) {
        this.chatSocket.close();
      }
      const socketURL = 'ws://182.92.86.71:4514/ws/chat/' + self.departmentList[index].team_id + '/';
      console.log("socketURL" + socketURL);
      this.chatSocket = new WebSocket(socketURL);
      this.chatSocket.onmessage = this.handleMessage;

      const jsonString = JSON.stringify(dataObject);
      // 加载企业成员
      this.$api.chat.post_get_team_members_and_permissions(jsonString)
        .then(function (response) {
          self.memberList.splice(0, self.memberList.length);
          self.is_creator_or_manager = response.data.is_creator_or_manager;
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
      await this.$api.chat.post_get_team_chat_history(jsonString1)
        .then(function (response) {
          response.data.chat_history.forEach(element => {
            let isSentByCurrentUser_1 = false;
            const num = parseInt(self.uid)
            if (element.user_id === num) {
              isSentByCurrentUser_1 = true;
            }
            let content = element.message;
            const message = {
              content: content,
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
      self.scrollToBottom();
    },

    async checkGroupMessage(index) {
      // if (this.curDepartmentId !== 0) {
      //   this.updateLeaveMessage();
      // }
      this.chat_type = 'group_chat';
      this.isPrivateChat = false;
      this.curentChatIndex = index;
      for (let i = 0; i < this.isInTheChat.length; i++) {
        this.isInTheChat[i] = false;
      }
      this.isInTheChat[index] = true;
      if (this.activeSelectName === 'second') {
        this.createGroupRedDotNum[index] = 0;
        this.isInCreateGroup = true;
        this.curDepartment = this.createGroupChatList[index].gc_name;
        this.curDepartmentId = this.createGroupChatList[index].gc_id;
      }
      else {
        this.joinGroupRedDotNum[index] = 0;
        this.isInCreateGroup = false;
        this.curDepartment = this.joinGroupChatList[index].gc_name;
        this.curDepartmentId = this.joinGroupChatList[index].gc_id;
      }
      const self = this;

      if (this.chatSocket !== null) {
        this.chatSocket.close();
      }
      const socketURL = 'ws://182.92.86.71:4514/ws/chat/' + self.curDepartmentId + '/';
      console.log("socketURL" + socketURL);
      this.chatSocket = new WebSocket(socketURL);
      this.chatSocket.onmessage = this.handleMessage;

      const dataObject_1 = {
        team_id: self.createGroupChatList[index].team_id,
        tm_user_id: self.uid
      };
      const jsonString_1 = JSON.stringify(dataObject_1);
      await this.$api.chat.post_get_team_members_and_permissions(jsonString_1)
        .then(function (response) {
          self.departmentMemberList.splice(0, self.departmentMemberList.length);
          response.data.members.forEach(element => {
            const mem = {
              uid: element.tm_user_id,
              name: element.tm_user_nickname
            }
            self.departmentMemberList.push(mem);
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      const dataObject = {
        gc_id: self.curDepartmentId
      };
      const jsonString = JSON.stringify(dataObject);
      await this.$api.chat.post_get_group_chat_members(jsonString)
        .then(function (response) {
          self.memberList.splice(0, self.memberList.length);
          response.data.members.forEach(element => {
            const mem = {
              uid: element.user_id,
              name: element.user_name
            }
            self.memberList.push(mem);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(self.departmentMemberList);
      console.log(self.memberList);
      self.chatMessages.splice(0, self.chatMessages.length);

      const dataObject1 = {
        gc_id: self.curDepartmentId,
      };
      const jsonString1 = JSON.stringify(dataObject1);
      await this.$api.chat.post_get_group_chat_history(jsonString1)
        .then(function (response) {
          response.data.chat_history.forEach(element => {
            let isSentByCurrentUser_1 = false;
            const num = parseInt(self.uid)
            if (element.user_id === num) {
              isSentByCurrentUser_1 = true;
            }
            let content = element.message;
            const message = {
              content: content,
              isSentByCurrentUser: isSentByCurrentUser_1,
              user_name: element.user_name,
              message_type: element.message_type,
              file_id: element.file_id,
              cm_id: element.cm_id
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
      self.scrollToBottom();
    },


    async checkPrivateMessage(index) {
      // if (this.curDepartmentId !== 0) {
      //   this.updateLeaveMessage();
      // }
      for (let i = 0; i < this.isInTheChat.length; i++) {
        this.isInTheChat[i] = false;
      }
      this.curentChatIndex = index;
      this.isInTheChat[index] = true;
      this.chat_type = 'private_chat';
      this.isInCreateGroup = false;
      this.isPrivateChat = true;
      this.privateRedDotNum[index] = 0;
      this.curDepartment = this.privateChatList[index].user_name;
      this.curDepartmentId = this.privateChatList[index].pc_id;
      const self = this;
      // 加载成员
      this.memberList.splice(0, this.memberList.length);
      const mem = {
        uid: self.privateChatList[index].user_name,
        name: self.privateChatList[index].user_id
      }
      self.memberList.push(mem);
      self.curPrivateID = self.privateChatList[index].pc_id;
      self.chatMessages.splice(0, self.chatMessages.length);
      const dataObject = {
        pc_id: self.privateChatList[index].pc_id,
      };

      if (this.chatSocket !== null) {
        this.chatSocket.close();
      }
      const socketURL = 'ws://182.92.86.71:4514/ws/chat/' + self.privateChatList[index].pc_id + '/';
      console.log("socketURL" + socketURL);
      this.chatSocket = new WebSocket(socketURL);
      this.chatSocket.onmessage = this.handleMessage;

      console.log(dataObject);
      const jsonString = JSON.stringify(dataObject);
      await this.$api.chat.post_get_private_chat_history(jsonString)
        .then(function (response) {
          console.log(response);
          response.data.chat_history.forEach(element => {
            let isSentByCurrentUser_1 = false;
            const num = parseInt(self.uid)
            if (element.user_id === num) {
              isSentByCurrentUser_1 = true;
            }
            let content = element.message;
            const message = {
              content: content,
              isSentByCurrentUser: isSentByCurrentUser_1,
              user_name: element.user_name,
              message_type: element.message_type,
              file_id: element.file_id,
              cm_id: element.cm_id,
              private_connect_id: 0
            }
            // console.log(message);
            self.chatMessages.push(message);
          });
          console.log(self.chatMessages);
        })
        .catch(function (error) {
          console.log(error);
        });
      // console.log(self.curDepartmentId);
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
      // console.log("111111111");
      // console.log(event);
      let content = data.message;
      let recv_message_used = {
        content: content,
        isSentByCurrentUser: false,
        user_name: data.user_name,
        message_type: data.message_type,
        file_id: data.file_id,
        private_connect_id: data.private_connect_id
      }
      console.log(recv_message_used);
      if (this.uid === data.user_id) {
        return;
      }
      this.handleAt(data);
      this.chatMessages.push(recv_message_used);
      console.log(this.chatMessages);
    },

    handleEnter() {
      console.log('回车键被按下');
      this.sendMessage();
    },
    handleEnterPrivate() {
      console.log('回车键被按下,是私聊模式');
      this.sendPrivateMessage();
    },
    handleEnterGroup() {
      console.log('回车键被按下,是群聊模式');
      this.sendGroupMessage();
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
      await this.$api.chat.post_store_message(send_message_to_backend)
        .then(function (response) {
          message_id = response.data.cm_id;
        })
        .catch(function (error) {
          console.log(error);
        });

      // await this.sleep(2000);

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
        await this.$api.message.post_group_send_notification_to_user(jsonString)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

      }

      this.sendRed(this.curentChatIndex);

      this.atList.splice(0, this.atList.length);
      this.isAtAll = false;
      // await self.sleep(1300);
      self.scrollToBottom();
      // console.log(this.chatMessages)
      console.log("send success")
    },
    async sendPrivateMessage() {
      const self = this;
      if (self.messageInput === '\n' || self.messageInput === '') {
        self.messageInput = '';
        return;
      }
      // socket发送的内容
      const send_message = JSON.stringify({
        'message': self.messageInput,
        'user_id': self.uid,
        'user_name': self.uname,
        'is_at_all': false,
        'array_data': [],
        'message_type': "message",
        'file_id': 0,
        'private_connect_id': 0
      })
      // 打印在屏幕上的内容
      let send_message_used = {
        content: self.messageInput,
        isSentByCurrentUser: true,
        user_name: self.uname,
        message_type: "message",
        file_id: 0
      }
      // 将消息存至数据库
      const send_message_to_backend = JSON.stringify({
        'message': self.messageInput,
        'user_id': self.uid,
        'pc_id': self.curPrivateID,
        'message_type': "message"
      })
      this.chatMessages.push(send_message_used);
      this.chatSocket.send(send_message);
      this.messageInput = '';

      ////// !!!!!!!存数据库
      await this.$api.chat.post_store_private_message(send_message_to_backend)
        .then(function (response) {
          console.log(response);
          console.log("fuck 送成功");
        })
        .catch(function (error) {
          console.log(error);
        });

        this.sendRed(this.curentChatIndex);
    },
    async sendGroupMessage() {
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
      let send_message_used = {
        content: this.messageInput,
        isSentByCurrentUser: true,
        user_name: this.uname,
        message_type: "message",
        file_id: 0
      }
      const send_message_to_backend = JSON.stringify({
        'message': this.messageInput,
        'user_id': this.uid,
        'gc_id': this.curDepartmentId,
        'is_at_all': this.isAtAll,
        'array_data': this.atList,
        'message_type': "message",
        'private_connect_id': this.privateChatMember
      })

      this.chatMessages.push(send_message_used);
      this.chatSocket.send(send_message);
      this.messageInput = '';

      let message_id = 1;
      await this.$api.chat.post_store_group_message(send_message_to_backend)
        .then(function (response) {
          message_id = response.data.cm_id;
        })
        .catch(function (error) {
          console.log(error);
        });

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
        await this.$api.message.post_group_send_notification_to_user(jsonString)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

      }


      this.sendRed(this.curentChatIndex);

      this.atList.splice(0, this.atList.length);
      this.isAtAll = false;
      // await self.sleep(1300);

      // console.log(this.chatMessages)
      console.log("send success Group")
    },
    openFileManager() {
      this.$refs.fileInput.click();
    },
    openImageManager() {
      this.$refs.imageInput.click();
    },
    sleep(ms) {
      console.log("sleep");
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    async send_file(event) {
      this.sendRed(this.curentChatIndex);

      const self = this;
      let file_id;
      const selectedFile = event.target.files[0];
      // 在这里可以处理选中的文件，例如发送到服务器等
      console.log('选中的文件:', selectedFile);
      const formData = new FormData();
      formData.append('file', selectedFile);

      await this.$api.document.post_upload_file(formData)
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
            'private_connect_id': self.privateChatMember
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
      // await self.sleep(4000);
      if (self.activeSelectName === 'first') {
        const send_message_to_backend = JSON.stringify({
          'message': selectedFile.name,
          'user_id': self.uid,
          'team_id': self.curDepartmentId,
          'is_at_all': self.isAtAll,
          'array_data': self.atList,
          'message_type': "file",
          'file_id': file_id,
          'private_connect_id': self.privateChatMember
        })
        console.log(send_message_to_backend);
        await this.$api.chat.post_store_message(send_message_to_backend)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      else if (self.activeSelectName === 'forth') {
        const send_message_to_backend = JSON.stringify({
          'message': selectedFile.name,
          'user_id': self.uid,
          'pc_id': self.curPrivateID,
          'message_type': "file",
          'file_id': file_id,
        })
        ////// !!!!!!!存数据库
        await this.$api.chat.post_store_private_message(send_message_to_backend)
          .then(function (response) {
            console.log(response);
            console.log("fuck 送成功");
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      else {
        const send_message_to_backend = JSON.stringify({
          'message': selectedFile.name,
          'user_id': self.uid,
          'gc_id': self.curDepartmentId,
          'is_at_all': self.isAtAll,
          'array_data': self.atList,
          'message_type': "file",
          'private_connect_id': self.privateChatMember,
          'file_id': file_id
        })

        await this.$api.chat.post_store_group_message(send_message_to_backend)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      const h = this.$createElement;

      this.$notify({
        title: '发送文件',
        message: h('i', { style: 'color: teal' }, '文件已发送')
      });

      self.scrollToBottom();
    },
    async send_image(event) {
      this.sendRed(this.curentChatIndex);
      const self = this;
      let file_id;
      const selectedFile = event.target.files[0];
      // 在这里可以处理选中的文件，例如发送到服务器等
      console.log('选中的文件:', selectedFile);
      const formData = new FormData();
      formData.append('file', selectedFile);

      await this.$api.document.post_upload_file(formData)
        .then(function (response) {
          file_id = response.data.file_id;


          const imageUrl = "http://182.92.86.71:4514/media/file/" + selectedFile.name;
          let send_message_file_used = {
            content: imageUrl,
            isSentByCurrentUser: true,
            user_name: self.uname,
            message_type: "image",
            file_id: file_id
          }
          const send_message_file = JSON.stringify({
            'message': imageUrl,
            'user_id': self.uid,
            'user_name': self.uname,
            'is_at_all': self.isAtAll,
            'array_data': self.atList,
            'message_type': "image",
            'file_id': file_id,
            'private_connect_id': self.privateChatMember
          })
          console.log(send_message_file)
          self.chatMessages.push(send_message_file_used);
          self.chatSocket.send(send_message_file);
        })

        .catch(function (error) {
          console.log(error);
        });
      const imageUrl = "http://182.92.86.71:4514/media/file/" + selectedFile.name;
      if (self.activeSelectName === 'first') {
        const send_message_to_backend = JSON.stringify({
          'message': imageUrl,
          'user_id': self.uid,
          'team_id': self.curDepartmentId,
          'is_at_all': self.isAtAll,
          'array_data': self.atList,
          'message_type': "image",
          'file_id': file_id,
          'private_connect_id': self.privateChatMember
        })
        console.log(send_message_to_backend);
        await this.$api.chat.post_store_message(send_message_to_backend)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      else if (self.activeSelectName === 'forth') {
        const send_message_to_backend = JSON.stringify({
          'message': imageUrl,
          'user_id': self.uid,
          'pc_id': self.curPrivateID,
          'message_type': "image",
          'file_id': file_id,
        })
        ////// !!!!!!!存数据库
        await this.$api.chat.post_store_private_message(send_message_to_backend)
          .then(function (response) {
            console.log(response);
            console.log("fuck 送成功");
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      else {
        const send_message_to_backend = JSON.stringify({
          'message': imageUrl,
          'user_id': self.uid,
          'gc_id': self.curDepartmentId,
          'is_at_all': self.isAtAll,
          'array_data': self.atList,
          'message_type': "image",
          'private_connect_id': self.privateChatMember,
          'file_id': file_id
        })

        await this.$api.chat.post_store_group_message(send_message_to_backend)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
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
      this.messageInput = `(对 ${this.memberList[index].name} 说悄悄话) `;
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
      await this.$api.message.post_skip_info(jsonString)
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


      self.checkTeamMessage(index);
      await self.sleep(1500);
      console.log(typeof cm_id);
      let index_chat = 0;
      await new Promise((resolve, reject) => {
        for (var i = 0; i < self.chatMessages.length; i++) {
          if (self.chatMessages[i].cm_id == cm_id) {
            index_chat = i;
          }
        }
        resolve();
      })

      ////// !!!!!!!!!!!这里取不到
      await self.sleep(2000);
      console.log(index_chat);
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
      await this.$api.chat.post_search_chat_message(jsonString)
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
            // console.log(message);
            self.chatMessages.push(message);
          });

        })
        .catch(function (error) {
          console.log(error);
        });
      self.scrollToBottom();
    },
    async searchGroupHistoryMessage() {
      const self = this;
      const dataObject = {
        user_id: self.uid,
        search_info: self.historyInput
      };
      const jsonString = JSON.stringify(dataObject);
      await this.$api.chat.post_search_group_chat_message(jsonString)
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
      self.scrollToBottom();
    },
    async searchPrivateHistoryMessage() {
      const self = this;
      const dataObject = {
        user_id: self.uid,
        search_info: self.historyInput
      };
      const jsonString = JSON.stringify(dataObject);
      await this.$api.chat.post_search_private_chat_message(jsonString)
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
    async skipToGroupHistoryMessage(message) {
      const self = this;
      let index = 0;
      let cm_id = 0;
      console.log(message);
      for (var i = 0; i < self.createGroupChatList.length; i++) {
        if (self.createGroupChatList[i].gc_id === message.gc_id) {
          index = i;
          cm_id = message.cm_id;
          console.log(i);
          console.log(message.cm_id);
          this.activeSelectName = 'second';
        }
      }
      for (var i = 0; i < self.joinGroupChatList.length; i++) {
        if (self.joinGroupChatList[i].gc_id === message.gc_id) {
          index = i;
          cm_id = message.cm_id;
          console.log(i);
          console.log(message.cm_id);
          this.activeSelectName = 'third';
        }
      }

      self.checkGroupMessage(index);
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
    async skipToPrivateHistoryMessage(message) {
      const self = this;
      let index = 0;
      let cm_id = 0;
      console.log(message);
      for (var i = 0; i < self.privateChatList.length; i++) {
        if (self.privateChatList[i].pc_id === message.pc_id) {
          index = i;
          cm_id = message.cm_id;
          console.log(i);
          console.log(message.cm_id);
        }
      }

      self.checkPrivateMessage(index);
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
    async createPrivateChat(index) {
      const self = this;
      const dataObject = {
        user1_id: self.uid,
        user2_id: self.memberList[index].uid,
        team_id: self.curDepartmentId
      };
      const jsonString = JSON.stringify(dataObject);
      await this.$api.chat.post_create_private_chat(jsonString)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      const h = this.$createElement;

      this.$notify({
        title: '通知',
        message: h('i', { style: 'color: teal' }, '创建私聊成功')
      });
      self.privateVisible_first = false;
      self.activeSelectName = 'third';
      // 跳转到私聊界面
    },
    async getPrivateChat() {
      const self = this;
      await self.sleep(1500);
      self.privateChatList.splice(0, self.privateChatList.length);
      const dataObject = {
        user_id: self.uid,
      };
      console.log(dataObject);
      const jsonString = JSON.stringify(dataObject);
      await this.$api.chat.post_acquire_private_chat(jsonString)
        .then(function (response) {
          console.log(response);
          console.log(response.data.private_chats_info);
          response.data.private_chats_info.forEach(element => {
            const person = {
              user_id: element.opposite_id,
              user_name: element.opposite_name,
              pc_id: element.pc_id
            }
            self.privateChatList.push(person);
          });
          console.log(self.privateChatList);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async createGroupChat() {
      // console.log(this.createChatForm);
      const self = this;
      const dataObject = {
        team_id: self.curDepartmentId,
        creator_id: self.uid,
        users_id: self.createChatForm.chatGroupMember,
        gc_name: self.createChatForm.chatGroupName
      };
      // console.log(dataObject);
      // console.log(self.createChatForm.chatGroupMember);
      const jsonString = JSON.stringify(dataObject);
      await this.$api.chat.post_create_group_chat(jsonString)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      self.createChatForm.chatGroupName = '';
      self.createChatForm.chatGroupMember.splice(0, self.createChatForm.chatGroupMember.length);
      self.createChatVisible = false;
      const h = this.$createElement;

      this.$notify({
        title: '通知',
        message: h('i', { style: 'color: teal' }, '群聊创建成功')
      });
    },
    async inviteMember() {
      const self = this;
      const dataObject = {
        gc_id: self.curDepartmentId,
        array_data: self.inviteMemberList
      };
      const jsonString = JSON.stringify(dataObject);
      await this.$api.chat.post_group_invite_member(jsonString)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      self.inviteMemberList.splice(0, self.inviteMemberList.length);
      self.inviteVisible = false;

      const h = this.$createElement;

      this.$notify({
        title: '通知',
        message: h('i', { style: 'color: teal' }, '邀请成员成功！')
      });
    },
    async deleteMember() {
      const self = this;
      const dataObject = {
        gc_id: self.curDepartmentId,
        array_data: self.deleteMemberList
      };
      const jsonString = JSON.stringify(dataObject);
      await this.$api.chat.post_group_delete_member(jsonString)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      self.deleteMemberList.splice(0, self.deleteMemberList.length);
      self.deleteVisible = false;

      const h = this.$createElement;

      this.$notify({
        title: '通知',
        message: h('i', { style: 'color: teal' }, '删除成员成功！')
      });
    },
    async deleteGroup() {
      const self = this;
      const dataObject = {
        gc_id: self.curDepartmentId
      };
      const jsonString = JSON.stringify(dataObject);
      await this.$api.chat.post_delete_group(jsonString)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      self.deleteGroupVisible = false;

      self.getGroupChat();
      self.checkSystemMessage();


      const h = this.$createElement;

      this.$notify({
        title: '通知',
        message: h('i', { style: 'color: teal' }, '解散群聊成功！')
      });
    },
    closeRelayMode() {
      this.isRelayMode = false;
      this.relayMessage.splice(0, this.relayMessage.length);
    },
    async handleRelay(index) {
      const self = this;
      if (self.selectedRelayMethodOptions === '逐条转发') {
        if (self.activeSelectName === 'first') {
          // self.checkTeamMessage(index);
          self.relayMessage.forEach(num => {
            const send_message_to_backend = JSON.stringify({
              'message': self.chatMessages[num].content,
              'user_id': self.uid,
              'team_id': self.departmentList[index].team_id,
              'is_at_all': false,
              'array_data': [],
              'message_type': self.chatMessages[num].message_type,
              'private_connect_id': 0,
              'file_id': self.chatMessages[num].file_id
            })
            this.$api.chat.post_store_message(send_message_to_backend)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
          });
          self.checkTeamMessage(index);
        }
        else if (self.activeSelectName === 'second') {
          self.relayMessage.forEach(num => {
            const send_message_to_backend = JSON.stringify({
              'message': self.chatMessages[num].content,
              'user_id': self.uid,
              'gc_id': self.createGroupChatList[index].gc_id,
              'is_at_all': false,
              'array_data': [],
              'message_type': self.chatMessages[num].message_type,
              'private_connect_id': 0,
              'file_id': self.chatMessages[num].file_id
            })
            this.$api.chat.post_store_group_message(send_message_to_backend)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
          });
          self.checkGroupMessage(index);
        }
        else if (self.activeSelectName === 'third') {
          self.relayMessage.forEach(num => {
            const send_message_to_backend = JSON.stringify({
              'message': self.chatMessages[num].content,
              'user_id': self.uid,
              'gc_id': self.joinGroupChatList[index].gc_id,
              'is_at_all': false,
              'array_data': [],
              'message_type': self.chatMessages[num].message_type,
              'private_connect_id': 0,
              'file_id': self.chatMessages[num].file_id
            })
            this.$api.chat.post_store_group_message(send_message_to_backend)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
          });
          self.checkGroupMessage(index);
        }
        else if (self.activeSelectName === 'forth') {
          self.relayMessage.forEach(num => {
            const send_message_to_backend = JSON.stringify({
              'message': self.chatMessages[num].content,
              'user_id': self.uid,
              'pc_id': self.privateChatList[index].pc_id,
              'message_type': self.chatMessages[num].message_type,
              'file_id': self.chatMessages[num].file_id
            })
            this.$api.chat.post_store_private_message(send_message_to_backend)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
          });
          self.checkPrivateMessage(index);
        }
      }
      else {
        let resString = '';
        resString += self.relayMessage.length.toString();
        self.relayMessage.forEach(num => {
          resString += ',';
          resString += self.chatMessages[num].cm_id.toString();
        });
        console.log(resString);
        if (self.activeSelectName === 'first') {
          // self.checkTeamMessage(index);
          const send_message_to_backend = JSON.stringify({
            'message': resString,
            'user_id': self.uid,
            'team_id': self.departmentList[index].team_id,
            'is_at_all': false,
            'array_data': [],
            'message_type': 'block',
            'private_connect_id': 0,
            'file_id': 0
          })
          this.$api.chat.post_store_message(send_message_to_backend)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
          self.checkTeamMessage(index);
        }
        else if (self.activeSelectName === 'second') {
          const send_message_to_backend = JSON.stringify({
            'message': resString,
            'user_id': self.uid,
            'gc_id': self.createGroupChatList[index].gc_id,
            'is_at_all': false,
            'array_data': [],
            'message_type': 'block',
            'private_connect_id': 0,
            'file_id': 0
          })
          this.$api.chat.post_store_group_message(send_message_to_backend)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
          self.checkGroupMessage(index);
        }
        else if (self.activeSelectName === 'third') {
          const send_message_to_backend = JSON.stringify({
            'message': resString,
            'user_id': self.uid,
            'gc_id': self.joinGroupChatList[index].gc_id,
            'is_at_all': false,
            'array_data': [],
            'message_type': 'block',
            'private_connect_id': 0,
            'file_id': 0
          })
          this.$api.chat.post_store_group_message(send_message_to_backend)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
          self.checkGroupMessage(index);
        }
        else if (self.activeSelectName === 'forth') {
          const send_message_to_backend = JSON.stringify({
            'message': resString,
            'user_id': self.uid,
            'pc_id': self.privateChatList[index].pc_id,
            'message_type': 'block',
            'file_id': 0
          })
          this.$api.chat.post_store_private_message(send_message_to_backend)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
          self.checkPrivateMessage(index);
        }
      }
      this.outerVisible = false;
      this.innerVisible = false;
      this.isRelayMode = false;
      this.relayMessage.splice(0, this.relayMessage.length);
      const h = this.$createElement;

      this.$notify({
        title: '通知',
        message: h('i', { style: 'color: teal' }, '转发成功！')
      });
    },
    handleCheckboxChange(label) {
      const index = this.relayMessage.indexOf(label);
      if (index > -1) {
        this.relayMessage.splice(index, 1);
      } else {
        this.relayMessage.push(label);
      }
      console.log(this.relayMessage);
    },
    async loadRelayMessage(content) {
      const self = this;
      const send_message_to_backend = JSON.stringify({
        'message': content,
      })
      await this.$api.chat.post_acquire_message_block(send_message_to_backend)
        .then(function (response) {
          console.log(response);
          self.curDepartment = '聊天记录'
          self.curDepartmentId = parseInt(content.split(",")[0]);
          self.chatMessages.splice(0, self.chatMessages.length);
          response.data.block_info.forEach(element => {
            let isSentByCurrentUser_1 = false;
            const num = parseInt(self.uid)
            if (element.user_id === num) {
              isSentByCurrentUser_1 = true;
            }
            let content = element.message;
            const message = {
              content: content,
              isSentByCurrentUser: isSentByCurrentUser_1,
              user_name: element.user_name,
              message_type: element.message_type,
              file_id: element.file_id,
              cm_id: element.cm_id,
              private_connect_id: 0
            }
            // console.log(message);
            self.chatMessages.push(message);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async updateLeaveMessage() {
      const self = this;
      const send_message_to_backend = JSON.stringify({
        'user_id': self.uid,
        'chat_type': self.chat_type,
        'chat_id': self.curDepartmentId
      })
      console.log("hello");
      console.log(send_message_to_backend);
      await this.$api.chat.post_update_leave_message(send_message_to_backend)
        .then(function (response) {
          console.log("hihihihi");
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    startTimer() {
      // this.timer = setInterval(this.acquireUnreadMessage, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    async acquireUnreadMessage() {
      const self = this;
      for (var i = 0; i < self.departmentList.length; i++) {
        const send_message_to_backend = JSON.stringify({
          'user_id': self.uid,
          'chat_type': "team_chat",
          'chat_id': self.departmentList[i].team_id
        })
        console.log(i);
        console.log(send_message_to_backend);
        await this.$api.chat.post_acquire_unread_message(send_message_to_backend)
          .then(function (response) {
            console.log(i);
            self.teamRedDotNum[i] = response.data.unread_message_count;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      for (var j = 0; j < self.createGroupChatList.length; j++) {
        const send_message_to_backend = JSON.stringify({
          'user_id': self.uid,
          'chat_type': "group_chat",
          'chat_id': self.createGroupChatList[j].gc_id
        })
        await this.$api.chat.post_acquire_unread_message(send_message_to_backend)
          .then(function (response) {
            self.createGroupRedDotNum[j] = response.data.unread_message_count;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      for (var i = 0; i < self.joinGroupChatList.length; i++) {
        const send_message_to_backend = JSON.stringify({
          'user_id': self.uid,
          'chat_type': "group_chat",
          'chat_id': self.joinGroupChatList[i].gc_id
        })
        await this.$api.chat.post_acquire_unread_message(send_message_to_backend)
          .then(function (response) {
            self.joinGroupRedDotNum[i] = response.data.unread_message_count;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      for (var i = 0; i < self.privateChatList.length; i++) {
        const send_message_to_backend = JSON.stringify({
          'user_id': self.uid,
          'chat_type': "private_chat",
          'chat_id': self.privateChatList[i].pc_id
        })
        console.log("111");
        console.log(send_message_to_backend);
        await this.$api.chat.post_acquire_unread_message(send_message_to_backend)
          .then(function (response) {
            self.privateRedDotNum[i] = response.data.unread_message_count;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
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
.el-footer {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background-color: #ffffff;
  color: #333;
  line-height: 60px;
  margin-right: 100px;
  height: 210px !important;
  margin-bottom: -900px;
  position: relative;
  border-radius: 0 0 50px 0;
}

.el-header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background-color: #ffffff;
  color: #333;
  line-height: 60px;
  margin-right: 100px;
  font-size: 20px;
  border-radius: 0 50px 0 0;
}

.el-aside {
  background-color: initial;
  background-image: linear-gradient(220deg, #5F5050 0%, #0F0000 100%);
  color: #e0dede;
  margin-bottom: -900px;
  width: 500px !important;
  margin-left: 60px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
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
  cursor: pointer;
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
  width: 1170px;
}

.send-button {
  padding: 12px 40px;
  position: absolute;
  bottom: 0;
  right: 20px;
  margin: 0 27px 10px 0px;
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
  overflow: auto;
  cursor: pointer;
}

.department-hovered {
  background-color: #a3a3a3;
}

.department-avatar {
  margin-left: 18px;
  margin-top: 15px;
  font-size: 20px;
}

.department-avatar-red {
  margin-left: 18px;
  margin-top: 5px;
  font-size: 30px;
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
  cursor: pointer;
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
  cursor: pointer;
}

.SelectChat {
  margin: 0 46px 0 0px;
}

.newChat {
  text-align: center;
}

.solo {
  padding: 0 0 0 62px;
  margin: 0 83px 0 -61px;
}

.file-two {
  margin: 0 -23px 0 0;
}

.private {
  margin: 0 38px 0 -23px;
}

.delete-group {
  color: #ff0000;
}

.relay {
  margin: 0 10px 0 -61px;
}

.relayDiv {
  height: 400px;
  overflow: auto;
}

body {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg data-css-pro-pattern-index='2' data-css-pro-pattern-opacity='40' data-css-pro-pattern-size='10px' data-css-pro-pattern-back-color='rgba(255%2C%20255%2C%20255%2C%200)' data-css-pro-pattern-front-color='rgba(0%2C%200%2C%200%2C%200.85)' xmlns='http://www.w3.org/2000/svg' width='100px' height='111.5px' viewBox='0 0 200 223' fill='none' xmlns:v='https://vecta.io/nano'%3E%3Cg clip-path='url(%23A)'%3E%3Cpath d='M200 0H0V223H200V0Z' fill='rgba(255%2C%20255%2C%20255%2C%200)'/%3E%3Cpath d='M200 105.419V23.874L161 0h-7.85L198 27.335v72.323l-26.51-15.313.08-45.088-37.94-21.914V0h-4v14.343 13.522L102 43.858V0h-4v43.858L70.37 27.855V14.613 0h-4v17.343L29.94 38.397l-1.51.86.08 45.088L2 99.658V27.335L46.84 0H39L0 23.874v81.545l39.59-22.864 24.67 14.343L40.65 110.5l-3 1.71h.13L0 135.374v81.545l39.59-22.884 24.67 14.342-25.35 14.663h8l19.44-11.212v11.212h4v-15.723l-37.88-22.004-.05-29.875L98 194.585v28.455h4v-28.455l65.56-39.147-.05 29.875-36.26 21.064-1.62.94v15.723h4v-11.252l19.44 11.252h8l-25.34-14.603 24.68-14.402L200 216.919v-81.545l-37.5-23.004h.17l-26.93-15.473 24.67-14.343L200 105.419zM59.25 26.065L100 49.669l29.65-17.193 11.1-6.411 24.87 14.372L100 79.634 34.38 40.437l24.87-14.372zM32.49 73.813l-.05-29.875L98 83.085v72.273l-27.63-16.003v-13.242-30.296L32.49 73.813zm-2.55 76.084l-1.51.86.08 45.088L2 211.158v-72.323l43.26-26.375 21.11-12.172v28.555l-36.43 21.054zM100 191.134l-65.62-39.197 24.87-14.372L100 161.169l29.65-17.143 11.1-6.411 24.87 14.372L100 191.134zm54.71-78.694L198 138.835v72.323l-26.51-15.313.08-45.088-37.94-21.914v-28.555l21.08 12.152zm-23.46-17.563l-1.62.94v30.006 13.532L102 155.358V83.085l65.56-39.147-.05 29.875-36.26 21.064z' fill='rgba(0%2C%200%2C%200%2C%200.4)'/%3E%3C/g%3E%3C/svg%3E") !important;
}

.background {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg data-css-pro-pattern-index='2' data-css-pro-pattern-opacity='40' data-css-pro-pattern-size='10px' data-css-pro-pattern-back-color='%2308072C' data-css-pro-pattern-front-color='rgba(252%2C%2058%2C%2058%2C%200.85)' xmlns='http://www.w3.org/2000/svg' width='100px' height='111.5px' viewBox='0 0 200 223' fill='none' xmlns:v='https://vecta.io/nano'%3E%3Cg clip-path='url(%23A)'%3E%3Cpath d='M200 0H0V223H200V0Z' fill='%2308072C'/%3E%3Cpath d='M200 105.419V23.874L161 0h-7.85L198 27.335v72.323l-26.51-15.313.08-45.088-37.94-21.914V0h-4v14.343 13.522L102 43.858V0h-4v43.858L70.37 27.855V14.613 0h-4v17.343L29.94 38.397l-1.51.86.08 45.088L2 99.658V27.335L46.84 0H39L0 23.874v81.545l39.59-22.864 24.67 14.343L40.65 110.5l-3 1.71h.13L0 135.374v81.545l39.59-22.884 24.67 14.342-25.35 14.663h8l19.44-11.212v11.212h4v-15.723l-37.88-22.004-.05-29.875L98 194.585v28.455h4v-28.455l65.56-39.147-.05 29.875-36.26 21.064-1.62.94v15.723h4v-11.252l19.44 11.252h8l-25.34-14.603 24.68-14.402L200 216.919v-81.545l-37.5-23.004h.17l-26.93-15.473 24.67-14.343L200 105.419zM59.25 26.065L100 49.669l29.65-17.193 11.1-6.411 24.87 14.372L100 79.634 34.38 40.437l24.87-14.372zM32.49 73.813l-.05-29.875L98 83.085v72.273l-27.63-16.003v-13.242-30.296L32.49 73.813zm-2.55 76.084l-1.51.86.08 45.088L2 211.158v-72.323l43.26-26.375 21.11-12.172v28.555l-36.43 21.054zM100 191.134l-65.62-39.197 24.87-14.372L100 161.169l29.65-17.143 11.1-6.411 24.87 14.372L100 191.134zm54.71-78.694L198 138.835v72.323l-26.51-15.313.08-45.088-37.94-21.914v-28.555l21.08 12.152zm-23.46-17.563l-1.62.94v30.006 13.532L102 155.358V83.085l65.56-39.147-.05 29.875-36.26 21.064z' fill='rgba(252%2C%2058%2C%2058%2C%200.4)'/%3E%3C/g%3E%3C/svg%3E");
  background-position: initial;
  background-size: initial;
  background-repeat: initial;
  height: 1045px;
}
::v-deep.select-tab.el-tabs .el-tabs__item {
  color: #ffffff !important;
}
::v-deep.select-tab.el-tabs .el-tabs__item.is-active {
  color: #3f9eff !important;
}
</style>