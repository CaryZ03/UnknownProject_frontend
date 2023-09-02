<template>
  <div class="container">
    <div class="box purple"></div>
    <div class="nav light">
      <button id="play">play()</button>
      <button id="pause">pause()</button>
      <button id="resume">resume()</button>
      <button id="reverse">reverse()</button>
      <button id="restart">restart()</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    let nav = document.querySelector(".nav");

    let tween = gsap.to(".purple", {
      duration: 4,
      x: () => nav.offsetWidth, // animate by the px width of the nav
      xPercent: -100, // offset by the width of the box
      rotation: 360,
      ease: "none",
      paused: true,
    });

    // click handlers for controlling the tween instance...
    document.querySelector("#play").onclick = () => tween.play();
    document.querySelector("#pause").onclick = () => tween.pause();
    document.querySelector("#resume").onclick = () => tween.resume();
    document.querySelector("#reverse").onclick = () => tween.reverse();
    document.querySelector("#restart").onclick = () => tween.restart();
  },

  methods: {
    test() {
      gsap.to(".box", { rotation: 27, x: 100, duration: 1 });

      // target the element with a class of "green" - rotate and move TO 100px to the left over the course of 1 second.
      gsap.to(".green", { rotation: 360, x: 100, duration: 1 });

      // target the element with a class of "purple" - rotate and move FROM 100px to the left over the course of 1 second.
      gsap.from(".purple", { rotation: -360, x: -100, duration: 1 });

      // target the element with a class of "blue" - rotate and move FROM 100px to the left, TO 100px to the right over the course of 1 second.
      gsap.fromTo(".blue", { x: -100 }, { rotation: 360, x: 100, duration: 1 });
    },
  },
};
</script>

<style>
body {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg data-css-pro-pattern-index='2' data-css-pro-pattern-opacity='40' data-css-pro-pattern-size='10px' data-css-pro-pattern-back-color='rgba(255%2C%20255%2C%20255%2C%200)' data-css-pro-pattern-front-color='rgba(0%2C%200%2C%200%2C%200.85)' xmlns='http://www.w3.org/2000/svg' width='100px' height='111.5px' viewBox='0 0 200 223' fill='none' xmlns:v='https://vecta.io/nano'%3E%3Cg clip-path='url(%23A)'%3E%3Cpath d='M200 0H0V223H200V0Z' fill='rgba(255%2C%20255%2C%20255%2C%200)'/%3E%3Cpath d='M200 105.419V23.874L161 0h-7.85L198 27.335v72.323l-26.51-15.313.08-45.088-37.94-21.914V0h-4v14.343 13.522L102 43.858V0h-4v43.858L70.37 27.855V14.613 0h-4v17.343L29.94 38.397l-1.51.86.08 45.088L2 99.658V27.335L46.84 0H39L0 23.874v81.545l39.59-22.864 24.67 14.343L40.65 110.5l-3 1.71h.13L0 135.374v81.545l39.59-22.884 24.67 14.342-25.35 14.663h8l19.44-11.212v11.212h4v-15.723l-37.88-22.004-.05-29.875L98 194.585v28.455h4v-28.455l65.56-39.147-.05 29.875-36.26 21.064-1.62.94v15.723h4v-11.252l19.44 11.252h8l-25.34-14.603 24.68-14.402L200 216.919v-81.545l-37.5-23.004h.17l-26.93-15.473 24.67-14.343L200 105.419zM59.25 26.065L100 49.669l29.65-17.193 11.1-6.411 24.87 14.372L100 79.634 34.38 40.437l24.87-14.372zM32.49 73.813l-.05-29.875L98 83.085v72.273l-27.63-16.003v-13.242-30.296L32.49 73.813zm-2.55 76.084l-1.51.86.08 45.088L2 211.158v-72.323l43.26-26.375 21.11-12.172v28.555l-36.43 21.054zM100 191.134l-65.62-39.197 24.87-14.372L100 161.169l29.65-17.143 11.1-6.411 24.87 14.372L100 191.134zm54.71-78.694L198 138.835v72.323l-26.51-15.313.08-45.088-37.94-21.914v-28.555l21.08 12.152zm-23.46-17.563l-1.62.94v30.006 13.532L102 155.358V83.085l65.56-39.147-.05 29.875-36.26 21.064z' fill='rgba(0%2C%200%2C%200%2C%200.4)'/%3E%3C/g%3E%3C/svg%3E");
}

button {
  text-transform: none;
  margin: 0.25rem;
}

.nav.light {
  padding-top: 2rem;
  background-color: transparent;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>