<template>
  <div class="container">
    <header>
      <h2 class="logo">logo</h2>
      <nav class="navigation">
        <a href=""><router-link to="">Home</router-link></a>
        <a href=""><router-link to="">Community</router-link></a>
        <a href=""><router-link to="WorkSpace">WorkSpace</router-link></a>
        <a href=""><router-link to="UML">UML</router-link></a>
        <button class="btnLogin-popup">Login</button>
      </nav>
    </header>

    <div class="wrapper">
      <span class="icon-close"><ion-icon name="close-outline"></ion-icon></span>

      <div class="form-box login">
        <h2>Login</h2>
        <form action="">
          <div class="input-box">
            <span class="icon"><ion-icon name="mail-unread"></ion-icon></span>
            <input type="text" v-model="user.email" required />
            <label>Email</label>
          </div>

          <div class="input-box">
            <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
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
              Don't have an account?<a href="" class="register-link"
                >Register</a
              >
            </p>
          </div>
        </form>
      </div>

      <div class="form-box register">
        <h2>Registeration</h2>
        <form action="#">
          <div class="input-box">
            <span class="icon"><ion-icon name="person"></ion-icon></span>
            <input type="text" v-model="userR.email" required />
            <label>Email</label>
          </div>

          <div class="input-box">
            <span class="icon"><ion-icon name="mail-unread"></ion-icon></span>
            <input type="text" v-model="userR.password1" required />
            <label>password</label>
          </div>

          <div class="input-box">
            <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
            <input type="password" v-model="userR.password2" required />
            <label>repeat password</label>
          </div>

          <div class="remember-forgot">
            <label
              ><input type="checkbox" />agree to the terms & conditions</label
            >
          </div>

          <button @click="register" class="btn">Register</button>

          <div class="login-register">
            <p>
              Already have an account?<a href="" class="login-link">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
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
    };
  },
  watch: {},
  computed: {},
  methods: {
    async login() {
      const data = JSON.stringify(this.user);
      console.log(data);

      await this.$api.user
        .post_user_login(data)
        .then((response) => {
          if (response.data["errno"] === 0){
            console.log("11111")
          }
          else{
            console.log("2222")
          }
        })
        .catch((error) => {
          Message.error("登录失败");
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

      this.$api.userInfo.postUserInfo_SendVeri(data).then((res) => {
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

    async register() {
      // todo 检测邮箱正确性
      console.log("isagree:" + this.isAgree);
      this.$api.user
        .post_user_register_check(this.userR)
        .then((res) => {
          if (response.data["errno"] == 0) {
            // todo 跳出输入验证码
            this.$api.user
              .post_send_verification_code(this.userR.email)
              .then((res2) => {
                if (res2.data["errno"] == 0) {
                  const tdata = {
                    email: this.userR.email,
                    verification_code: this.vericode,
                  };
                  //检测验证码
                  this.$api.post_check_verification_code(tdata).then((res3) => {
                    if (res3.data["errno"] == 0) {
                      this.$api.post_user_register(this.userR).then((res4) => {
                        if (res4.data["errno"] == 0) {
                          alert("注册成功");
                        }
                      });
                    }
                  });
                }
              });
          }
        })
        .catch((error) => {});
    },

    async send_verification_code() {},
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
    });

    loginLink.addEventListener("click", () => {
      wrapper.classList.remove("active");
    });

    btnLogin.addEventListener("click", () => {
      wrapper.classList.add("active-popup");
    });

    iconClose.addEventListener("click", () => {
      wrapper.classList.remove("active-popup");
    });
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

  background: #fff;
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
