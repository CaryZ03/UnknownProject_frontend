<template>
  <div class="container">
    <section class="panel blue">
      <h1>Pair with CSS Scroll Snapping</h1>
    </section>

    <section class="panel orange">
      <p>This element will spin.</p>
    </section>

    <section class="panel red">
      <p>This background color will change</p>
    </section>

    <section class="panel blue yoyo">
      <p>Yoyo Text!</p>
    </section>
  </div>
</template>
  
  <script>
export default {
  mounted() {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.defaults({
      toggleActions: "restart pause resume pause",
      scroller: ".outcontainer",
    });

    gsap.to(".orange p", {
      scrollTrigger: ".orange",
      duration: 2,
      rotation: 360,
    });

    gsap.to(".red", {
      scrollTrigger: {
        trigger: ".red",
        toggleActions: "restart pause reverse pause",
      },
      duration: 1,
      backgroundColor: "#FFA500",
      ease: "none",
    });

    gsap.to(".blue", {
      scrollTrigger: {
        trigger: ".blue",
        toggleActions: "restart pause reverse pause",
      },
      duration: 1,
      backgroundColor: "#FFA500",
      ease: "none",
    });
    gsap.to(".orange", {
      scrollTrigger: {
        trigger: ".orange",
        toggleActions: "restart pause reverse pause",
      },
      duration: 1,
      backgroundColor: "#FFA500",
      ease: "none",
    });

    gsap.to(".yoyo p", {
      scrollTrigger: ".yoyo",
      scale: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2",
    });
  },
};
</script>
  
  <style>
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
}

.red {
  background-color: #cf3535;
  background-image: none;
}

.orange {
  background-color: #eeab02;
  background-image: none;
}

.blue {
  background-color: #62a6ff;
  background-image: none;
}

.panel p {
  font-size: 32px;
}

.rightTxt {
  -webkit-tap-highlight-color: transparent;
  background-color: #faebd7;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  float: right;
  font-family: Poppins, sans-serif;
  font-size: 14px;
  font-weight: 400;
  height: 40.8vh;
  line-height: normal;
  padding: 0;
  right: 0;
  top: 10vh;
  width: 40vh;
  border-width: 0px;
  border-style: none;
  box-shadow: none;
  display: block;
  margin: 145px 4px 0 0;
}
</style>