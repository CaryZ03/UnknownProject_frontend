<template>
  <div class="items">
    <template>
      <button
        v-show="items.length !== 0"
        class="item"
        :class="{ 'is-selected': index === selectedIndex }"
        v-for="(item, index) in items"
        :key="index"
        @click="selectItem(index)"
      >
        {{ item }}
      </button>
    </template>
  </div>
</template>
  

  <script>
import store from "@/store";

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },

    command: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      selectedIndex: 0,
    };
  },

  watch: {
    items() {
      this.selectedIndex = 0;
    },
  },

  methods: {
    onKeyDown({ event }) {
      if (event.key === "ArrowUp") {
        this.upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        this.downHandler();
        return true;
      }

      if (event.key === "Enter") {
        this.enterHandler();
        return true;
      }

      return false;
    },

    upHandler() {
      this.selectedIndex =
        (this.selectedIndex + this.items.length - 1) % this.items.length;
    },

    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
    },

    enterHandler() {
      this.selectItem(this.selectedIndex);
    },
    splitStringAndNumber(str) {
      const matches = str.match(/^(.*)(@\d+)$/); // 使用正则表达式匹配字符串和数字部分

      if (matches && matches.length === 3) {
        const stringPart = matches[1]; // 拆分得到的字符串部分
        const numberPart = parseInt(matches[2].substring(1)); // 拆分得到的数字部分（去除开头的@符号，并转为整数）

        return [stringPart, numberPart];
      }

      return ["", 0]; // 如果无法匹配，返回默认值
    },

    selectItem(index) {
      const item = this.items[index];

      if (item) {
        const [stringPart, numberPart] = this.splitStringAndNumber(item);

        console.log(stringPart); // 输出：'example '
        console.log(numberPart); // 输出：123
        this.command({ id: stringPart });
        const receiver_list = [];
        // const uid = this.$store.state.curUserID ;
        receiver_list.push(numberPart);

        console.log("STORE ID" + store.state.curUserID);

        const currentPath = 'http://unknown.blablablabla.fun'+ window.location.pathname;
        console.log(currentPath);

        const jsonString = JSON.stringify({
          notification: {
            name: "有人@了你",
            content:  currentPath,
            creator_id: store.state.curUserID,
            type: "document",
            cm_id: 0,
          },
          receiver_list: receiver_list,
        });
        this.$api.message
          .post_group_send_notification_to_user(jsonString)
          .then((res) => {
            console.log(res);
          });
      }
    },
  },
};
</script>
  
  <style lang="scss">
.items {
  padding: 0.2rem;
  position: relative;
  border-radius: 0.5rem;
  background: #fff;
  color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  font-size: 0.9rem;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0px 10px 20px rgba(0, 0, 0, 0.1);
}

.item {
  display: block;
  margin: 0;
  width: 100%;
  text-align: left;
  background: transparent;
  border-radius: 0.4rem;
  border: 1px solid transparent;
  padding: 0.2rem 0.4rem;

  &.is-selected {
    border-color: #000;
  }
}
</style>