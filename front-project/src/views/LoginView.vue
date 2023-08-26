<template>
    <body>
        <header>
            <h2 class="logo">logo</h2>
            <nav class="navigation">
                <a href="#"><router-link to=""></router-link></a>
                <a href="#"><router-link to=""></router-link></a>
                <a href="#"><router-link to=""></router-link></a>
                <a href="#"><router-link to=""></router-link></a>
                <a href="#"><router-link to=""></router-link></a>
                <button class="btnLogin-popup">Login</button>
            </nav>
        </header>

        <div class="wrapper">
            <span class="icon-close"><ion-icon name="close-outline"></ion-icon></span>

            <div class="form-box login">
                <h2>Login</h2>
                <form action="#">
                    <div class="input-box">
                        <span class="icon"><ion-icon name="mail-unread"></ion-icon></span>
                        <input type="text" required>
                        <label>Email</label>
                    </div>

                    <div class="input-box">
                        <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                        <input type="password" required>
                        <label>password</label>
                    </div>

                    <div class="remember-forgot">
                        <label><input type="checkbox">Remember Me</label>
                        <a href="#">Forgot Password</a>
                    </div>

                    <button type="submit" class="btn">Login</button>

                    <div class="login-register">
                        <p>Don't have an account?<a href="#" class="register-link">Register</a></p>
                    </div>
                </form>
            </div>

            <div class="form-box register">
                <h2>Registeration </h2>
                <form action="#">
                    <div class="input-box">
                        <span class="icon"><ion-icon name="person"></ion-icon></span>
                        <input type="text" required>
                        <label>Email</label>
                    </div>

                    <div class="input-box">
                        <span class="icon"><ion-icon name="mail-unread"></ion-icon></span>
                        <input type="text" required>
                        <label>Username</label>
                    </div>

                    <div class="input-box">
                        <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                        <input type="password" required>
                        <label>password</label>
                    </div>

                    <div class="remember-forgot">
                        <label><input type="checkbox">agree to the terms & conditions</label>
                    </div>

                    <button type="submit" class="btn">Register</button>

                    <div class="login-register">
                        <p>Already have an account?<a href="#" class="login-link">Login</a></p>
                    </div>
                </form>
            </div>
        </div>


        <!-- <script src="script.js"></script>
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script> -->
    </body>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
    return {
      user: {
        username: '',
        password: ''
      },
      userR: {
        username: '',
        password1: '',
        password2: ''
      },
      userChange: {
        username: '',
        password1: '',
        password2: ''
      },
      isAgree: false,
      isRemember: false
    }
  },
    watch: {},
    computed: {},
    methods: {
        login(){

        },
        register(){

        },
        forgetPass(){

        },
        checkEmail(){

        }
    },
    created() { },
    mounted() {

        const wrapper = document.querySelector('.wrapper')
        const loginLink = document.querySelector('.login-link')
        const registerLink = document.querySelector('.register-link')

        const btnLogin = document.querySelector('.btnLogin-popup')
        const iconClose = document.querySelector('.icon-close')

        registerLink.addEventListener('click', () => {
            wrapper.classList.add('active');
        });

        loginLink.addEventListener('click', () => {
            wrapper.classList.remove('active');
        });


        btnLogin.addEventListener('click', () => {
            wrapper.classList.add('active-popup');
        });


        iconClose.addEventListener('click', () => {
            wrapper.classList.remove('active-popup');
        })

    }
};
</script>
<style  scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    /* background: url('background.jpg'); */

    background-size: cover;
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
    transition: .3s;
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
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: -6px;
    left: 0;
    background: #fff;
    border-radius: 5px;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform .4s;
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
    border: 2px solid rgba(255, 255, 255, .5);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    transform: scale(0);
    transition: transform .5s ease, height .2s ease;
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
    transition: transform .18s ease;
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
    transition: transform .18s ease;
    transform: translateX(0);
}



.wrapper .icon-close {
    position: absolute;
    top: 0;
    right: 0;
    width: 45px;
    height: 45px;
    background: #7f7a7a;
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
.input-box input:focus~label,
.input-box input:valid~label {
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
    transition: all .3s ease;
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
    font-size: .9em;
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
    color: #fff;
    text-decoration: none;
}

.remember-forgot a:hover {
    text-decoration: underline;
}

.btn {
    width: 100%;
    height: 45px;

    background: #424242;
    border: none;
    outline: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
    color: #fff;
    font-weight: 500;

}

.login-register {
    font-size: .9em;
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