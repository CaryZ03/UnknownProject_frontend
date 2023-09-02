<template>
  <div class="process-wrapper">
    <div id="progress-bar-container">
      <ul>
        <li class="step" v-for="(h, index) in his" :key="index">
          <div class="step-inner" @click="handleChildEvent(h.sd_id)">
            {{ his[index]["sd_saved_time"] }}
          </div>
        </li>
        <li class="step">
          <div class="step-inner"  @click="handleReturnNow()" >当前版本</div>
        </li>
      </ul>
      <div id="line">
        <div id="line-progress"></div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  created() {
    this.teamid = this.$route.params.teamid;
    this.docid = this.$route.params.docid;
  },

  mounted() {},
  data() {
    return {
      teamid: -1,
      docid: -1,
    };
  },

  props: {
    his: {
      type: [],
      required: true,
    },
  },

  methods: {
    sendDataToParent() {
      const data = "Hello, parent!";
      this.$emit("child-event", data);
    },
    handleChildEvent(sdId) {
      this.$emit('child-event', sdId);
    },
    handleReturnNow(){
      this.$emit('returnNow');
    }
  },
};
</script>
  
<style scoped>
.process-wrapper {
  margin: auto;
  max-width: 2080px;
}

#progress-bar-container {
  position: relative;
  width: 90%;
  margin: auto;
  height: 100px;
  margin-top: 65px;
}

#progress-bar-container ul {
  padding: 0;
  margin: 0;
  padding-top: 15px;
  z-index: 9999;
  position: absolute;
  width: 100%;
  margin-top: -40px;
}

#progress-bar-container li:before {
  content: " ";
  display: block;
  margin: auto;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: solid 2px #aaa;
  transition: all ease 0.3s;
}

#progress-bar-container li.active:before,
#progress-bar-container li:hover:before {
  border: solid 2px #fff;
  background: linear-gradient(to right, #e91e63 0%, #fff 100%);
}

#progress-bar-container li {
  list-style: none;
  float: left;
  width: 20%;
  text-align: center;
  color: #aaa;
  text-transform: uppercase;
  font-size: 11px;
  cursor: pointer;
  font-weight: 700;
  transition: all ease 0.2s;
  vertical-align: bottom;
  height: 60px;
  position: relative;
}

#progress-bar-container li .step-inner {
  position: absolute;
  width: 100%;
  bottom: 0;
  font-size: 14px;
}

#progress-bar-container li.active,
#progress-bar-container li:hover {
  color: #444;
}

#progress-bar-container li:after {
  content: " ";
  display: block;
  width: 6px;
  height: 6px;
  background: #777;
  margin: auto;
  border: solid 7px #fff;
  border-radius: 50%;
  margin-top: 40px;
  box-shadow: 0 2px 13px -1px rgba(0, 0, 0, 0.3);
  transition: all ease 0.2s;
}

#progress-bar-container li:hover:after {
  background: #555;
}

#progress-bar-container li.active:after {
  background: #207893;
}

#progress-bar-container #line {
  width: 100%;
  margin: auto;
  background: #eee;
  height: 6px;
  position: absolute;
  left: 0;
  top: 57px;
  z-index: 1;
  border-radius: 50px;
  transition: all ease 0.9s;
}
</style>
