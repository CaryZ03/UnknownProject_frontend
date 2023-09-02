<template>
  <div class="outcontainer" v-scroll="handleScroll">
    <header>
      <h2 class="logo">UnKnown</h2>
      <nav class="navigation">
        <a href=""
          ><router-link v-show="this.$store.state.isLogin" to=""
            >Home</router-link
          ></a
        >
        <a href=""
          ><router-link v-show="this.$store.state.isLogin" to=""
            >Community</router-link
          ></a
        >
        <!-- <a href=""><router-link to="WorkSpace">WorkSpace</router-link></a> -->
        <a
          href=""
          v-show="this.$store.state.isLogin"
          @click.prevent="showTeamDialog"
          >WorkSpace</a
        >
        <!-- <a href=""><router-link to="UML">UML</router-link></a> -->
        <button
          v-show="!this.$store.state.isLogin"
          class="btnLogin-popup"
          @click="goDown"
        >
          Login
        </button>
        <button
          v-show="this.$store.state.isLogin"
          @click="logout"
          class="btnLogout-popup"
        >
          Logout
        </button>
      </nav>
    </header>

    <section class="panel" v-show="!isJumpTutor" id="1">
      <transition name="slide-fade" mode="out-in">
        <img
          v-if="show"
          ref="leftPic"
          :src="require('@/assets/Directors.png')"
          class="leftPic"
          alt=""
        />
        <!-- <div v-if="show" ref="leftPic" class="leftPic" ></div> -->
      </transition>

      <transition name="rlide-fade" mode="out-in">
        <div v-if="show" class="rightTxt">
          <h1>HIHIHIHIH</h1>
          <h2>HIHIHIHIHIHIHIHI</h2>
          <h3>HIHIHIHIHHIHIHIHIHIHI</h3>
        </div>
      </transition>
    </section>

    <section class="panel" v-show="!isJumpTutor" id="2">
      <transition name="slide-fade" mode="out-in">
        <img
          v-if="!show"
          ref="leftPic"
          :src="require('@/assets/Directors.png')"
          class="leftPic"
          alt=""
        />
      </transition>

      <transition name="rlide-fade" mode="out-in">
        <div v-if="!show" class="rightTxt">
          <h1>HIHIHIHIH</h1>
          <h2>HIHIHIHIHIHIHIHI</h2>
          <h3>HIHIHIHIHHIHIHIHIHIHI</h3>
        </div>
      </transition>
    </section>

    <section class="panel" v-show="!isJumpTutor" id="3">
      <transition name="slide-fade" mode="out-in">
        <img
          v-if="show"
          ref="leftPic"
          :src="require('@/assets/Directors.png')"
          class="leftPic"
          alt=""
        />
      </transition>

      <transition name="rlide-fade" mode="out-in">
        <div v-if="show" class="rightTxt">
          <h1>HIHIHIHIH</h1>
          <h2>HIHIHIHIHIHIHIHI</h2>
          <h3>HIHIHIHIHHIHIHIHIHIHI</h3>
        </div>
      </transition>
    </section>

    <section class="panel" v-show="!isJumpTutor" id="4">
      <transition name="slide-fade" mode="out-in">
        <img
          v-if="!show"
          ref="leftPic"
          :src="require('@/assets/Directors.png')"
          class="leftPic"
          alt=""
        />
      </transition>

      <transition name="rlide-fade" mode="out-in">
        <div v-if="!show" class="rightTxt">
          <h1>HIHIHIHIH</h1>
          <h2>HIHIHIHIHIHIHIHI</h2>
          <h3>HIHIHIHIHHIHIHIHIHIHI</h3>
        </div>
      </transition>
    </section>

    <section class="panel" id="5">
      <!-- 选择团队界面 -->

      <!-- 选择团队界面 -->
      <el-dialog
        title="选择团队"
        :visible.sync="dialogVisible"
        width="40%"
        :modal-append-to-body="false"
        class="class_dialog_hospital"
      >
        <!-- <el-table :data="teamList" style="width: 100%" @row-click="handleRowClick">
      <el-table-column prop="team_id" label="团队ID" width="70"></el-table-column>
      <el-table-column prop="team_name" label="团队名称"></el-table-column>
      <el-table-column prop="team_description" label="团队描述"></el-table-column>
      <el-table-column prop="team_tel" label="联系电话"></el-table-column>
      <el-table-column prop="team_creator" label="创建者"></el-table-column>
      <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTeam(row)"></el-button>
          </template>
        </el-table-column>
    </el-table> -->

        <!-- 新团队列表 -->
        <div class="overflow-y-auto pb-1 select-none">
          <div>
            <!-- <el-col v-for="document in documentTable" :key="document.id" :span="6"></el-col> -->
            <!-- 切换团队单元格 -->
            <div
              style="opacity: 1"
              v-for="team in teamList"
              :key="team.team_id"
              :span="6"
              @click="handleRowClick(team)"
            >
              <div
                data-test-id="aside-space-item"
                class="flex relative items-center justify-between cursor-pointer px-2 rounded text-black animate-hover h-[58px]"
              >
                <div class="flex items-center w-10/12">
                  <span class="mr-2 flex items-center">
                    <div class="flex items-center">
                      <div class="relative">
                        <!-- 图标 -->
                        <span
                          class="text-h4 flex flex-shrink-0 select-none items-center justify-center rounded uppercase leading-none text-black2 w-[34px] h-[34px]"
                          style="
                            font-size: 20px;
                            background-color: rgb(62, 193, 250);
                          "
                        >
                          {{ getInitials(team.team_creator) }}
                        </span>
                      </div>
                    </div>
                  </span>
                  <div class="w-full text-ellipsis">
                    <div
                      data-no-cancel-selected="true"
                      class="text-ellipsis w-full block"
                    >
                      {{ team.team_creator }}的团队空间
                    </div>
                    <div class="text-ellipsis text-grey3 text-t4 mt-px w-full">
                      {{ team.team_name }}
                    </div>
                  </div>

                  <!-- <i class="el-icon-check" v-if="team.team_id === currentTeam.team_id"></i> -->
                  <el-button
                    type="danger"
                    icon="el-icon-close"
                    size="mini"
                    @click="deleteTeam(team)"
                    v-if="isDeleteButtonPressed"
                  ></el-button>
                </div>
              </div>
            </div>

            <!-- 新增和删除按钮 -->
            <div style="opacity: 1" :span="6">
              <div
                data-test-id="aside-space-item"
                class="flex relative items-center justify-between cursor-pointer px-2 rounded text-black animate-hover h-[58px]"
              >
                <div class="flex items-center w-10/12">
                  <!-- 按钮 -->
                  <el-button
                    type="primary"
                    icon="el-icon-plus"
                    @click="showCreateTeamDialog()"
                    circle
                  ></el-button>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    @click="isDeleteButtonPressed = !isDeleteButtonPressed"
                    circle
                  ></el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <el-button type="primary" icon="el-icon-plus" @click="showCreateTeamDialog()" size="mini">新建团队</el-button> -->
      </el-dialog>

      <!-- 新建团队界面 -->
      <el-dialog
        :visible.sync="createTeamDialogVisible"
        title="新建团队"
        :modal-append-to-body="false"
        class="class_dialog_hospital"
      >
        <el-form label-width="100px">
          <el-form-item label="团队名称">
            <el-input
              v-model="newTeam.team_name"
              placeholder="请输入团队名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="团队描述">
            <el-input
              v-model="newTeam.team_description"
              type="textarea"
              rows="3"
              placeholder="请输入团队描述"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input
              v-model="newTeam.team_tel"
              placeholder="请输入联系电话"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelCreateTeam" size="mini">取消</el-button>
          <el-button type="primary" @click="submitCreateTeam" size="mini"
            >确定</el-button
          >
        </span>
      </el-dialog>
      <div class="container">
        <div v-show="!this.$store.state.isLogin" class="wrapper active-popup">
          <span class="icon-close" style="color: black"
            ><i class="el-icon-close"></i
          ></span>

          <div class="form-box login">
            <h2>Login</h2>
            <form @submit.prevent="">
              <div class="input-box">
                <span class="icon"><i class="el-icon-edit"></i></span>
                <input type="text" v-model="user.email" required />
                <label>Email</label>
              </div>

              <div class="input-box">
                <span class="icon"><i class="el-icon-lock"></i></span>
                <input type="password" v-model="user.password" required />
                <label>password</label>
              </div>

              <div class="remember-forgot">
                <label><input type="checkbox" />Remember Me</label>
                <a href="">Forgot Password</a>
              </div>

              <button @click="login" class="btn">Login</button>

              <div class="login-register">
                <p style="font-size: 16px">
                  Don't have an account?<a
                    href="#"
                    @click="changeToRegister"
                    class="register-link"
                    >Register</a
                  >
                </p>
              </div>
            </form>
          </div>

          <div class="form-box register">
            <h2>注册</h2>
            <form @submit.prevent="">
              <div class="input-box">
                <span class="icon"><i class="el-icon-edit"></i></span>
                <input type="text" v-model="userR.email" required />
                <label>邮箱</label>
              </div>

              <div class="input-box">
                <span class="icon"><i class="el-icon-lock"></i></span>
                <input type="password" v-model="userR.password1" required />
                <label>密码</label>
              </div>

              <div class="input-box">
                <span class="icon"><i class="el-icon-lock"></i></span>
                <input type="password" v-model="userR.password2" required />
                <label>重复密码</label>
              </div>

              <div v-show="showVeriBox" class="input-box">
                <span class="icon"><i class="el-icon-lock"></i></span>
                <input type="text" v-model="vericode" required />
                <label>验证信息</label>
              </div>

              <div class="remember-forgot">
                <label
                  ><input type="checkbox" />agree to the terms &
                  conditions</label
                >
              </div>

              <button v-if="!showVeriBox" @click="register" class="btn">
                Register
              </button>
              <button v-else @click="ensureVericodeReg" class="btn">
                Ensure
              </button>

              <div class="login-register">
                <p style="font-size: 16px">
                  Already have an account?<a
                    href="#"
                    @click="changeToLogin"
                    class="login-link"
                    >Login</a
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>



<script>
import "vue2-animate/dist/vue2-animate.min.css";
export default {
  directives: {
    scroll: {
      inserted(el, binding) {
        // 滚动事件处理逻辑
        el.addEventListener("scroll", binding.value);
      },
      unbind(el, binding) {
        // 解绑滚动事件处理函数
        el.removeEventListener("scroll", binding.value);
      },
    },
  },
  components: {},
  props: {},
  data() {
    return {
      isDeleteButtonPressed: false,

      user: {
        email: "",
        password: "",
      },

      userR: {
        email: "",
        password1: "",
        password2: "",
      },
      userChange: {
        email: "",
        password1: "",
        password2: "",
      },

      wrapper: null,
      loginLink: null,
      registerLink: null,

      btnLogin: null,
      iconClose: null,

      vericode: "",
      isAgree: false,
      isRemember: false,
      showVeriBox: false,
      sectionid: "1",

      isJumpTutor: false,

      //chooseTeam
      teamList: [
        {
          team_id: 10,
          team_name: "牛魔成本",
          team_description: "nmsl",
          team_tel: "1111112323",
          team_creator: "ddadadad",
        },
      ],
      dialogVisible: false,
      createTeamDialogVisible: false,
      newTeam: {
        team_name: "",
        team_description: "",
        team_tel: "",
      },

      windowHeight: -1,
      show: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    getInitials(name) {
      const splitName = name.split(" ");
      const initials = splitName.map((part) => part[0]).join("");
      return initials.toUpperCase();
    },

    deleteTeam(row) {
      event.stopPropagation(); // 阻止冒泡事件
      this.$confirm("确定要删除团队吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 在这里执行具体的删除逻辑
          const tmp = {
            team_id: row.team_id,
          };
          this.$api.team
            .post_delete_team(tmp)
            .then((response) => {
              // console.log(tmp)
              // console.log(response.data)
              if (response.data.errno == 0) {
                console.log("删除成功");
                console.log(response.data.msg);
                this.flashTeamList();
              }
            })
            .catch((error) => {
              alert("失败");
              console.log("error：\n");
              console.log(error);
            });

          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    login() {
      const data = JSON.stringify(this.user);
      console.log("login!!");
      console.log(data);
      // this.wrapper.classList.add("active-popup");

      this.$api.user
        .post_user_login(data)
        .then((response) => {
          if (response.data["errno"] == 0) {
            console.log(response.data["token_key"]);
            // this.$router.push({
            //   path: `/WorkSpace`,
            // });

            this.$store.state.isLogin = true;
            this.$store.state.curUserMail = this.user.email;
            this.$store.state.curUserID = response.data["uid"];
            this.$store.state.curUserName = response.data["user_name"];
            localStorage.setItem("isLogin", true);
            localStorage.setItem("curUserID", this.$store.state.curUserID);
            localStorage.setItem("curUserMail", this.$store.state.curUserMail);
            localStorage.setItem("token", response.data["token_key"]);
            localStorage.setItem("curUserName", response.data["user_name"]);
            // this.wrapper.classList.remove("active-popup");

            this.flashTeamList();
            this.dialogVisible = true;
          } else {
            console.log(response.data);
          }
        })
        .catch((error) => {
          // Message.error("登录失败");
          console.log("登录失败");
          console.log(error);
          // alert("wa")
        });
    },

    forgetPass() {
      // const
      // this.$api.userInfo.postUserInfo_ChangeUserInfo(data)
      const data = {
        username: this.user.username,
      };
      console.log("data.username" + data.username);

      this.$api.user.postUserInfo_SendVeri(data).then((res) => {
        alert("what fuck");
        if (res.data.errno == 0) {
          //发送邮箱成功，等验证码

          this.$prompt("请输入验证码", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          })
            .then(({ value }) => {
              console.log("value2:jsontring" + JSON.stringify(value));
              // console.log("value2:jsontring"+JSON.stringify(value2))
              console.log("value2:" + value);
              console.log("res.data.code" + res.data.code);
              var value1;
              if (value == res.data.code) {
                //改邮箱
                this.$message({
                  type: "success",
                  message: "验证码验证成功",
                });

                this.$prompt("请输入新密码", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                })
                  .then(({ value }) => {
                    this.userChange.password1 = value;
                    this.userChange.password2 = value;

                    const tmp = {
                      username: this.user.username,
                      password1: value,
                      password2: value,
                    };
                    this.$api.userInfo
                      .postUserInfo_ResetPassword(tmp)
                      .then((res1) => {
                        if (res1.data.errno == 0) {
                          this.$message({
                            type: "success",
                            message: "修改成功",
                          });
                        } else {
                          this.$message({
                            type: "error",
                            message: "修改失敗",
                          });
                        }
                      });
                  })
                  .catch(() => {
                    this.$message({
                      type: "info",
                      message: "取消輸入",
                    });
                  });
                // this.addressIsBind = true;
              } else {
                this.$message({
                  type: "error",
                  message: "验证码错误",
                });
              }
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "取消输入",
              });
            });
        } else {
          this.$message({
            type: "error",
            message: "验证码发送失败",
          });
        }
      });
    },

    register() {
      //检测注册邮箱合理性
      this.$api.user
        .post_user_register_check(this.userR)
        .then((res) => {
          // 如果邮箱合理
          if (res.data["errno"] == 0) {
            // 发邮件
            const emailJson = {
              email: this.userR.email,
            };
            this.$api.user
              .post_send_verification_code(emailJson)
              .then((res2) => {
                // 发邮箱成功
                if (res2.data["errno"] == 0) {
                  this.showVeriBox = true;
                }
              })
              .catch((error) => {
                // 发邮件错误
              });
          } else {
            // 如果检测邮箱合理errno！=0
            alert("wrong");
          }
        })
        .catch((error) => {
          // 检测邮箱合理error
        });
    },

    send_verification_code() {
      const data = {};
      this.$api.user
        .post_send_verification_code(data)
        .then((res) => {
          return res.data["errno"];
        })
        .catch((error) => {
          return -1;
        });
    },

    ensureVericodeReg() {
      const tdata = {
        email: this.userR.email,
        verification_code: this.vericode,
      };
      //检测验证码
      this.$api.user
        .post_check_verification_code(tdata)
        .then((res3) => {
          // alert(res3.data["errno"])
          // 验证码正确
          if (res3.data["errno"] == 0) {
            this.$api.user
              .post_user_register(this.userR)
              .then((res4) => {
                if (res4.data["errno"] == 0) {
                  console.log(res4.data);
                  alert("注册成功");
                  // todo:跳转到登录
                } else {
                  alert("注册失败");
                }
              })
              .catch((error) => {
                // 注册失败
              });
          }
          // 验证码输入错误
          else {
          }
        })
        .catch((error) => {
          // 上传验证码错误
        });
      // 暂时给一次机会
      this.showVeriBox = false;
      // 发邮箱errno！=0
    },

    handleRowClick(row) {
      // 处理选择团队的逻辑，可以在这里跳转到对应团队的页面
      console.log("选择了团队", row);

      this.dialogVisible = false; // 关闭弹窗
      this.$store.state.curTeam = row;

      localStorage.setItem(
        "curTeam",
        JSON.stringify(this.$store.state.curTeam)
      );

      this.$router.push("/WorkSpace"); // 进行页面跳转

      if (localStorage.getItem("curTeam") === null)
        localStorage.setItem(
          "curTeam",
          JSON.stringify(this.$store.state.curTeam)
        );
      else {
        if (
          this.$store.state.curTeam !==
          JSON.parse(localStorage.getItem("curTeam"))
        ) {
          localStorage.setItem(
            "curTeam",
            JSON.stringify(this.$store.state.curTeam)
          );
          localStorage.removeItem("currentProgram");
          localStorage.removeItem("isProgramChosen");
        }
      }

      this.$router.push("/WorkSpace"); // 进行页面跳转
    },

    showTeamDialog() {
      // 显示弹窗的逻辑
      this.flashTeamList();
      this.dialogVisible = true; // 假设弹窗组件的名称为Dialog
    },

    showCreateTeamDialog() {
      // 显示新建团队的弹窗
      this.createTeamDialogVisible = true;
      // console.log('this.createTeamDialogVisible ='+this.createTeamDialogVisible)
    },

    cancelCreateTeam() {
      // 取消新建团队
      this.createTeamDialogVisible = false;
      // 清空输入框
      this.newTeam.team_name = "";
      this.newTeam.team_description = "";
      this.newTeam.team_tel = "";
    },
    submitCreateTeam() {
      // 提交新建团队
      // 在这里发送请求，将新建团队的信息提交至后端保存
      // 假设发送请求的方法名为createTeam，接收一个team对象作为参数
      // this.createTeam(this.newTeam);
      console.log("submitting...");
      console.log(this.newTeam);
      this.createTeam();
    },

    createTeam() {
      const tmp = {
        name: this.newTeam.team_name,
        description: this.newTeam.team_description,
        tel: this.newTeam.team_tel,
      };
      this.$api.team
        .post_create_team(tmp)
        .then((response) => {
          // console.log(tmp)
          // console.log(response.data)
          if (response.data.errno == 0) {
            console.log("新建团队成功");
            console.log(response.data.msg);
            // 隐藏新建团队的弹窗，并清空输入框
            this.createTeamDialogVisible = false;
            this.flashTeamList();
          }
        })
        .catch((error) => {
          alert("新建团队失败");
          console.log("失败error：\n");
          console.log(error);
        });
    },
    handleScroll() {
      // 获取页面正在展示的section逻辑
      console.log("scroll!!!");
      if (
        this.sectionid == "1" ||
        this.sectionid == "3" ||
        this.sectionid == "5"
      ) {
        this.show = false;
      } else {
        this.show = true;
      }
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          this.sectionid = section.id;
          console.log("当前展示的section:", section.id);
          if (section.id == "1" || section.id == "3" || this.sectionid == "5") {
            this.show = true;
          } else {
            this.show = false;
          }
        }
      });
    },
    //获取团队列表
    flashTeamList() {
      const tmp1 = {
        choose: "all",
      };
      console.log(tmp1);
      this.$api.user
        .post_check_team_list(tmp1)
        .then((response) => {
          // console.log(tmp)
          // console.log(response.data)
          if (response.data.errno == 0) {
            console.log("获取团队列表成功");
            console.log(response.data.tm_info);

            if (response.data.tm_info.length === 0) {
              this.teamList = [];
            } else {
              const tmInfoArray = response.data.tm_info.map((item) =>
                JSON.parse(item.replace(/\\/g, ""))
              );

              console.log(tmInfoArray);
              //赋值
              this.teamList = tmInfoArray;
            }
          }
        })
        .catch((error) => {
          alert("获取团队列表失败");
          console.log("团队列表error：\n");
          console.log(error);
        });
    },

    logout() {
      this.$api.user
        .post_logout()
        .then((res) => {
          console.log("logout");
          this.$store.state.isLogin = false;
          this.$store.state.curUserID = -1;
          this.$store.state.curUserName = "";
          this.$store.state.token_key = "";
          this.$store.state.curUserMail = "";
          this.$store.state.curUserName = "";
          localStorage.removeItem("isLogin");
          localStorage.removeItem("curUserID");
          localStorage.removeItem("curUserMail");
          localStorage.removeItem("curUserName");
          localStorage.removeItem("token");
        })
        .catch((err) => {
          alert("logout failed");
        });
    },

    changeToRegister() {
      this.wrapper.classList.add("active");
      this.showVeriBox = false;
    },
    changeToLogin() {
      this.wrapper.classList.remove("active");
    },
    goDown() {
      this.isJumpTutor = true;
    },
  },
  created() {},
  mounted() {
    this.show = true;
    // const box = this.$refs["panel"];

    // gsap.registerPlugin(ScrollTrigger);

    // ScrollTrigger.defaults({
    //   toggleActions: "restart pause resume pause",
    //   scroller: ".outcontainer",
    // });

    // gsap.to(".leftPic", {rotation: 27, x: 100, duration: 1});

    this.windowHeight = window.innerHeight;
    // window.addEventListener("scroll", this.handleScroll);
    this.wrapper = document.querySelector(".wrapper");
    this.loginLink = document.querySelector(".login-link");
    this.registerLink = document.querySelector(".register-link");

    this.btnLogin = document.querySelector(".btnLogin-popup");
    this.iconClose = document.querySelector(".icon-close");

    this.wrapper.classList.add("active-popup");

    this.registerLink.addEventListener("click", () => {
      this.wrapper.classList.add("active");
      this.showVeriBox = false;
    });

    this.loginLink.addEventListener("click", () => {
      this.wrapper.classList.remove("active");
    });

    this.btnLogin.addEventListener("click", () => {
      console.log("click Login ???");
      this.wrapper.classList.add("active-popup");
    });

    this.iconClose.addEventListener("click", () => {
      this.wrapper.classList.remove("active-popup");
      this.showVeriBox = false;
    });

    //获取用户的团队列表
    // if(this.$store.state.isLogin){
    this.flashTeamList();
    // }
  },

  destroyed() {
    // window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>
<style  scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.outcontainer {
  max-height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}

.container {
  position: flex;

  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  background: url("../assets/background.jpg");
  background-size: cover;
  background-position: center;

  display: flex; /* 添加 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* background: url('../assets/background.png'); */
  background-size: contain;
  /* background-size: cover; */
  background-position: center;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 100px;
  /* background: red; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
}

.logo {
  font-size: 2em;
  color: #fff;
  user-select: none;
}

.navigation {
  position: relative;
  font-size: 1.1em;
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  margin-left: 40px;
}

.navigation .btnLogin-popup {
  width: 130px;
  height: 50px;
  background: transparent;
  border: 2px solid #fff;
  outline: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1em;
  color: #fff;
  font-weight: 500;
  margin-left: 40px;
  transition: 0.3s;
}
.navigation .btnLogout-popup {
  width: 130px;
  height: 50px;
  background: transparent;
  border: 2px solid #fff;
  outline: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1em;
  color: #fff;
  font-weight: 500;
  margin-left: 40px;
  transition: 0.3s;
}
.navigation a {
  position: relative;
  font-size: 1.1em;
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  margin-left: 40px;
}

.navigation a::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  bottom: -6px;
  left: 0;
  background: #fff;
  border-radius: 5px;
  transform-origin: right;
  transform: scaleX(0);
  transition: transform 0.4s;
}

.navigation a:hover::after {
  transform-origin: left;
  transform: scaleX(1);
}

.navigation .btnLogin-popup:hover {
  background: #fff;
  color: #fff;
}

.wrapper {
  position: relative;
  width: 400px;
  height: 440px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  display: flex;
  transform: scale(0);
  transition: transform 0.5s ease, height 0.2s ease;
}

.wrapper.active-popup {
  transform: scale(1);
}

.wrapper.active {
  height: 520px;
}

.wrapper .form-box {
  width: 100%;
  padding: 40px;
}

.wrapper .form-box.login {
  transition: transform 0.18s ease;
  transform: translateX(0);
}

.wrapper.active .form-box.login {
  /* display: none; */
  transition: none;
  transform: translateX(-400px);
}

.wrapper .form-box.register {
  position: absolute;
  transform: translateX(400px);
}

.wrapper.active .form-box.register {
  /* display: none; */
  transition: transform 0.18s ease;
  transform: translateX(0);
}

.wrapper .icon-close {
  position: absolute;
  top: 0;
  right: 0;
  width: 45px;
  height: 45px;
  background: #fff;
  font-size: 2em;
  display: flex;
  color: #fff;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 20px;
  cursor: pointer;
  z-index: 1;
}

.form-box h2 {
  font-size: 2em;
  color: #fff;
  text-align: center;
}

.input-box {
  position: relative;
  width: 100%;
  height: 50px;
  border-bottom: 2px solid #fff;
  margin: 30px 0;
}

/* .input-box input:not(:placeholder-shown)~label, */
.input-box input:focus ~ label,
.input-box input:valid ~ label {
  top: -5px;
}

.input-box label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  font-size: 1em;
  color: #fff;
  font-weight: 500;
  pointer-events: none;
  transition: all 0.3s ease;
}

.input-box input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1em;
  color: #fff;
  font-weight: 600;
  padding: 0 35px 0 5px;
}

.input-box .icon {
  position: absolute;
  right: 8px;
  font-size: 1.2em;
  color: #fff;
  line-height: 57px;
}

.remember-forgot {
  font-size: 0.9em;
  color: #fff;
  font-weight: 500;
  margin: -15px 0 15px;
  display: flex;
  justify-content: space-between;
}

.remember-forgot label input {
  accent-color: #fff;
  margin: 3px;
}

.remember-forgot a {
  color: #ffffff;
  text-decoration: none;
}

.remember-forgot a:hover {
  text-decoration: underline;
}

.btn {
  width: 100%;
  height: 45px;

  background: #4e4d4d;
  border: none;
  outline: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  color: #fff;
  font-weight: 500;
}

.login-register {
  font-size: 0.9em;
  color: #fff;
  text-align: center;
  font-weight: 500;
  margin: 25px 0 10px;
}

.login-register p a {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
}

.login-register p a:hover {
  text-decoration: underline;
}
</style>

<!-- gsap -->
<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.container {
  max-height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}

.panel {
  scroll-snap-align: start;
  height: 100vh;
  background-image: url("../assets/background.jpg");
}

.red {
  background-color: #cf3535;
  background-image: none;
}

.blue {
  background-color: #3f9fff;
  background-image: none;
}

.orange {
  background-color: #ff9500;
  background-image: none;
}

.panel p {
  font-size: 32px;
}
.rightTxt {
  right: 10%;
  top: 20vh;
  width: 32vw;
  height: 60vh;
  background-color: antiquewhite;
  float: right;
  position: relative;
}

.leftPic {
  left: 10%;
  top: 20vh;
  background-color: antiquewhite;
  float: left;
  position: relative;

  max-width: 40%;
  height: auto;
}
</style>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 2.5s;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-290px);
  scale: 130%;
}

.rlide-fade-enter-active,
.rlide-fade-leave-active {
  transition: all 2.5s;
}

.rlide-fade-enter,
.rlide-fade-leave-to {
  opacity: 0;
  transform: translateX(290px);
}
</style>

<!-- hide scrollbar -->
<style scoped>
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>


<style scoped>
/* 上方展开栏的专属样式*/
body {
  background: #eee;
  /* This is just a helper in case the element has a transparent background or white colors. */
}

/* * {
  outline: 0;
  transition: background-color .1s ease-out;
}

*, ::after, ::before {
  border-style: solid;
  border-width: 0;
  box-sizing: border-box;
} */

.inherited-styles-for-exported-element2 {
  font-family: "PingFang SC", "Microsoft YaHei", ui-sans-serif, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial,
    sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
  tab-size: 4;
  width: 100%;
}

svg {
  vertical-align: middle;
}

*,
::after,
::before {
  -webkit-font-smoothing: subpixel-antialiased;
  border-color: #e5e5e5;
}

::selection {
  background: rgba(24, 160, 251, 0.12);
}

:disabled {
  cursor: default;
}

.text-t2,
.text-t4 {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.text-t4 {
  font-size: 12px;
  line-height: 18px;
}

.text-h4 {
  font-size: 18px;
  font-weight: 600;
}

.text-ellipsis {
  overflow: hidden;
  text-wrap: nowrap;
  white-space-collapse: collapse;
}

.animate-hover {
  transition-duration: 0.1s;
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
}

.next-modal {
  background-clip: padding-box;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.03) 0 0 0 1px, rgba(0, 0, 0, 0.1) 0 3px 6px,
    rgba(0, 0, 0, 0.1) 0 12px 20px;
  color: #000;
}

.relative {
  position: relative;
}

.mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.mr-1 {
  margin-right: 0.25rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.mt-px {
  margin-top: 1px;
}

.block {
  display: block;
}

.inline {
  display: inline;
}

.flex {
  display: flex;
}

.h-full {
  height: 100%;
}

.h-9 {
  height: 2.25rem;
}

.h-5 {
  height: 1.25rem;
}

.h-10 {
  height: 2.5rem;
}

.h-\[34px\] {
  height: 34px;
}

.h-\[58px\] {
  height: 58px;
}

.h-\[1em\] {
  height: 1em;
}

.max-h-\[70vh\] {
  max-height: 70vh;
}

.w-full {
  width: 100%;
}

.w-5 {
  width: 1.25rem;
}

.w-10\/12 {
  width: 83.3333%;
}

.w-64 {
  width: 16rem;
}

.w-\[34px\] {
  width: 34px;
}

.w-\[1em\] {
  width: 1em;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.cursor-pointer {
  cursor: pointer;
}

.cursor-\[grab\] {
  cursor: grab;
}

.select-none {
  user-select: none;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.overflow-y-auto {
  overflow-y: auto;
}

.text-ellipsis {
  text-overflow: ellipsis;
}

.rounded {
  border-radius: 0.25rem;
}

.border-t {
  border-top-width: 1px;
}

.border-grey6 {
  border-color: #e5e5e5;
}

.fill-current {
  fill: currentcolor;
}

.p-2 {
  padding: 0.5rem;
}

.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.pb-1 {
  padding-bottom: 0.25rem;
}

.uppercase {
  text-transform: uppercase;
}

.leading-none {
  line-height: 1;
}

.text-grey4 {
  color: #bdbdbd;
}

.text-grey3 {
  color: #828282;
}

.text-black,
.text-black2 {
  color: #000;
}

::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.animate-hover:hover {
  background-color: rgba(0, 0, 0, 0.06);
}

.overflow-y-auto:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.3) !important;
}

html {
  font-size: 16px;
  /* This is IMPORTANT since some copied values use "REM" units */
}
</style>