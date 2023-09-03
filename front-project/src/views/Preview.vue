
<!-- todo 需要查询组织其他的预览 -->
<template>
  <div class="tdesign-demo-item--layout">
    <t-button theme="default" variant="dashed" @click="sendLink">分享预览</t-button>
    <t-button theme="default" variant="dashed" @click="ret">返回上一级</t-button>
    <t-layout>
      <t-content>
        <div
          class="main"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh; /* 可以根据需要设置容器的高度 */
          "
          v-html="htmlString"
        ></div>
      </t-content>
    </t-layout>
  </div>
</template>



<script>
import { Icon } from "tdesign-icons-vue";
export default {
  name: "preview",
  data() {
    return {
      htmlString: "",
      link: "",
    };
  },
  components: {
    Icon,
  },
  mounted() {
    // 获取传递过来的 HTML 字符串
    this.htmlString = this.$route.query.htmlString;
    this.link = this.$route.fullPath;
  },

  methods: {
    sendLink(){

      const fullPath =  'http://' + "unknown.blablablabla.fun"+ this.link;
      const textArea = document.createElement('textarea');
      textArea.value = fullPath;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.$message({
          message: '已经复制分享链接',
          type: 'success'
        });
      // return this.link;
    },
    ret(){
      this.$router.go(-1);
    }

  },
};
</script>

<style>
.left {
  width: 30%;
  height: 100%;
  background-color: black;
}
</style>