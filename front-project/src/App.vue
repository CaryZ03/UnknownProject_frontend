
<template>
  <!-- <div class="outbox">

    <div class="nav">
      <ul>
        <li><router-link to=""><a href="">产品</a></router-link></li>
        <li><router-link to=""><a href="">素材</a></router-link></li>
        <li><router-link to="/WorkSpace"><a href="">工作区</a></router-link></li>
        <li><router-link to=""><a href="">关于我们</a></router-link></li>
        <li><router-link to=""><a href="">帮助中心</a></router-link></li>
        <li><router-link to="/Login"><a href="">登录</a></router-link></li>
        <div class="nav-box"></div>
      </ul>

    </div>
    
  </div> -->
  <router-view></router-view>
</template>

<style scoped>
* {
  list-style: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
}

.outbox {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* background-color: #8da1f8; */
  background: url(./assets/background.png);
  background-size: cover;

}

.nav {
  width: 100%;
  height: 70px;
  position: relative;
  top: 35px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  background-color: #413f43;
}

.nav ul {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  right: 5%;
}

.nav ul .nav-box {
  position: absolute;
  bottom: 0;
  left: 0;
  /* 如果导航栏就六个导航，那么每个导航的宽度都是整个导航
    的六分之一 */
  width: calc((100% / 6)*1);
  height: 10px;
  border-radius: 2px;
  transition: .5s;
}

.nav ul li {
  width: 100%;
  text-align: center;
}

.nav ul li a {
  color: rgb(70, 100, 180);
  font: 100 30px '优设标题黑';
  display: block;
  width: 100%;
  height: 100%;
  line-height: 70px;
}

.nav ul li:nth-child(1):hover~.nav-box {
  left: calc(100% / 6 *0);
  background-color: rgb(47, 38, 49);
}

.nav ul li:nth-child(2):hover~.nav-box {
  left: calc(100% / 6 *1);
  background-color: red;
}

.nav ul li:nth-child(3):hover~.nav-box {
  left: calc(100% / 6 *2);
  background-color: #d18df8;
}

.nav ul li:nth-child(4):hover~.nav-box {
  left: calc(100% / 6 *3);
  background-color: #ffb1b1;
}

.nav ul li:nth-child(5):hover~.nav-box {
  left: calc(100% / 6 *4);
  background-color: #8da1f8;
}

.nav ul li:nth-child(6):hover~.nav-box {
  left: calc(100% / 6 *5);
  background-color: #7df88e;
}
</style> 
<style scoped>
/* for css pro */
</style>