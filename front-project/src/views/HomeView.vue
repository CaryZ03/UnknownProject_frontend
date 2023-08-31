<template>
  <div class="container">
    <header>
      <h2 class="logo">logo</h2>
      <nav class="navigation">
        <a href=""><router-link to="">Home</router-link></a>
        <a href=""><router-link to="">Community</router-link></a>
        <!-- <a href=""><router-link to="WorkSpace">WorkSpace</router-link></a> -->
        <a href="" @click.prevent="showTeamDialog">WorkSpace</a>
        <a href=""><router-link to="UML">UML</router-link></a>
        <button v-if="!this.$store.state.isLogin" class="btnLogin-popup">
          Login
        </button>
        <button v-else @click="logout" class="btnLogout-popup">
          Logout
        </button>
      </nav>
    </header>

    <div class="wrapper">
      <span class="icon-close"><i class="el-icon-close"></i></span>

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
            <p>
              Don't have an account?<a href="#" class="register-link"
                >Register</a
              >
            </p>
          </div>
        </form>
      </div>

      <div class="form-box register">
        <h2>Registeration</h2>
        <form @submit.prevent="">
          <div class="input-box">
            <span class="icon"><i class="el-icon-edit"></i></span>
            <input type="text" v-model="userR.email" required />
            <label>Email</label>
          </div>

          <div class="input-box">
            <span class="icon"><i class="el-icon-lock"></i></span>
            <input type="text" v-model="userR.password1" required />
            <label>password</label>
          </div>

          <div class="input-box">
            <span class="icon"><i class="el-icon-lock"></i></span>
            <input type="password" v-model="userR.password2" required />
            <label>repeat password</label>
          </div>

          <div v-show="showVeriBox" class="input-box">
            <span class="icon"><i class="el-icon-lock"></i></span>
            <input type="password" v-model="vericode" required />
            <label>Vericode</label>
          </div>

          <div class="remember-forgot">
            <label
              ><input type="checkbox" />agree to the terms & conditions</label
            >
          </div>

          <button v-if="!showVeriBox" @click="register" class="btn">
            Register
          </button>
          <button v-else @click="ensureVericodeReg" class="btn">Ensure</button>

          <div class="login-register">
            <p>
              Already have an account?<a href="#" class="login-link">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>

    <!-- 选择团队界面 -->
    <el-dialog title="选择团队" :visible.sync="dialogVisible" width="50%" :modal-append-to-body="false" >
    <el-table :data="teamList" style="width: 100%" @row-click="handleRowClick">
      <el-table-column prop="team_id" label="团队ID"></el-table-column>
      <el-table-column prop="team_name" label="团队名称"></el-table-column>
      <el-table-column prop="team_description" label="团队描述"></el-table-column>
      <el-table-column prop="team_tel" label="联系电话"></el-table-column>
      <el-table-column prop="team_creator" label="创建者"></el-table-column>
      <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTeam(row)"></el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-button type="primary" icon="el-icon-plus" @click="showCreateTeamDialog()">新建团队</el-button>
  </el-dialog>

    <!-- 新建团队界面 -->
    <el-dialog :visible.sync="createTeamDialogVisible" title="新建团队" :modal-append-to-body="false">
    <el-form label-width="100px">
      <el-form-item label="团队名称">
        <el-input v-model="newTeam.team_name" placeholder="请输入团队名称"></el-input>
      </el-form-item>
      <el-form-item label="团队描述">
        <el-input v-model="newTeam.team_description" type="textarea" rows="3" placeholder="请输入团队描述"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="newTeam.team_tel" placeholder="请输入联系电话"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelCreateTeam">取消</el-button>
      <el-button type="primary" @click="submitCreateTeam">确定</el-button>
    </span>
  </el-dialog>


  </div>
</template>



<script>

export default {
  components: {},
  props: {},
  data() {
    return {
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

      vericode: "",
      isAgree: false,
      isRemember: false,
      showVeriBox: false,


      //chooseTeam
      teamList:[{
        team_id: 10,
          team_name: '牛魔成本',
          team_description: 'nmsl',
          team_tel: '1111112323',
          team_creator: 'ddadadad'
      },
      ],
      dialogVisible: false,
      createTeamDialogVisible: false,
      newTeam: {
        team_name: '',
        team_description: '',
        team_tel: ''
      },

    };
  },
  watch: {},
  computed: {},
  methods: {

    deleteTeam(row){
      event.stopPropagation(); // 阻止冒泡事件
      this.$confirm('确定要删除团队吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // 在这里执行具体的删除逻辑
          const tmp ={
            "team_id": row.team_id,
          }
          this.$api.team.post_delete_team(tmp).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("删除成功")
              console.log(response.data.msg)
              this.flashTeamList();
            }
          }).catch(error => {
            alert("失败")
            console.log("error：\n");
            console.log(error)
          })

          

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },


    login() {
      const data = JSON.stringify(this.user);
      console.log(data);

      this.$api.user
        .post_user_login(data)
        .then((response) => {
          if (response.data["errno"] == 0) {
            alert("1");
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
            alert("登录成功");
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
      console.log('选择了团队', row);
  
      this.dialogVisible = false; // 关闭弹窗
      this.$store.state.curTeam = row;
      this.$router.push('/WorkSpace'); // 进行页面跳转
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
      this.newTeam.team_name = '';
      this.newTeam.team_description = '';
      this.newTeam.team_tel = '';
    },
    submitCreateTeam() {
      // 提交新建团队
      // 在这里发送请求，将新建团队的信息提交至后端保存
      // 假设发送请求的方法名为createTeam，接收一个team对象作为参数
      // this.createTeam(this.newTeam);
      console.log('submitting...')
      console.log(this.newTeam)
      this.createTeam();
      
    },

    createTeam(){
      const tmp={
        "name": this.newTeam.team_name,
        "description": this.newTeam.team_description,
        "tel": this.newTeam.team_tel
      }
      this.$api.team.post_create_team(tmp).then((response) => {
          // console.log(tmp)
          // console.log(response.data)
          if (response.data.errno == 0) {
            console.log("新建团队成功")
            console.log(response.data.msg)
            // 隐藏新建团队的弹窗，并清空输入框
            this.createTeamDialogVisible = false;
            this.flashTeamList();
          }
        }).catch(error => {
          alert("新建团队失败")
          console.log("失败error：\n");
          console.log(error)
        });
    
      
    },
    //获取团队列表
    flashTeamList(){
      
      const tmp1 = {
          'choose': 'all',
        }
        console.log(tmp1)
        this.$api.user.post_check_team_list(tmp1).then((response) => {
          // console.log(tmp)
          // console.log(response.data)
          if (response.data.errno == 0) {
            console.log("获取团队列表成功")
            console.log(response.data.tm_info)

            if(response.data.tm_info.length === 0){
              this.teamList = []
            }
            else{
              const tmInfoArray = response.data.tm_info.map((item) => JSON.parse(item.replace(/\\/g, '')));

              console.log(tmInfoArray);
              //赋值
              this.teamList = tmInfoArray;
            }
            
            
          }
        }).catch(error => {
          alert("获取团队列表失败")
          console.log("团队列表error：\n");
          console.log(error)
        })

        
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
          this.$store.state.curUserMail= "";
          this.$store.state.curUserName= "";
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
    
  },
  created() {},
  mounted() {
    const wrapper = document.querySelector(".wrapper");
    const loginLink = document.querySelector(".login-link");
    const registerLink = document.querySelector(".register-link");

    const btnLogin = document.querySelector(".btnLogin-popup");
    const iconClose = document.querySelector(".icon-close");

    registerLink.addEventListener("click", () => {
      wrapper.classList.add("active");
      this.showVeriBox = false;
    });

    loginLink.addEventListener("click", () => {
      wrapper.classList.remove("active");
    });

    btnLogin.addEventListener("click", () => {
      wrapper.classList.add("active-popup");
    });

    iconClose.addEventListener("click", () => {
      wrapper.classList.remove("active-popup");
      this.showVeriBox = false;
    });

    //获取用户的团队列表
    // if(this.$store.state.isLogin){
          this.flashTeamList();
    // }
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
.container {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/background.png");
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
  position: absolute;
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
