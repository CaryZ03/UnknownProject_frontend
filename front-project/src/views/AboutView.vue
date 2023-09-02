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
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
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