<template>
    <draggable
      v-model="componentList"
      item-key="id"
      class="content"
      :group="{ name: 'component' }"
    >
      <!-- 
        组件点击后，修改样式为激活状态
      -->
      <template slot-scope="{ element }">
        <div
          :class="active === element.tag ? 'item-content active' : 'item-content'"
          @click="active = element.tag"
        >
          <!-- 
            使用vue的动态组件component 需要绑定一个is指明是哪个标签，is里面是标签名
            使用v-bind绑定这个组件的属性（传入一个对象即可）
            v-on使用v-on绑定这个组件对应的事件即可
           -->
          <component
            :is="element.tag"
            :v-bind="element.props"
            :v-on="element.event"
            >{{ element.tag == 'a-button' ? 'a-button' : '' }}</component
          >
        </div>
      </template>
    </draggable>
  </template>
  
  <script>
  import draggable from 'vuedraggable';
  
  export default {
    components: { draggable },
    data() {
      return {
        active: '',
        componentList: [],
      };
    },
  };
  </script>
  
  <style>
  .content {
    height: 100%;
  }
  
  .item-content {
    margin: 10px;
  }
  
  .active {
    padding: 10px;
    border: springgreen 1px solid;
  }
  </style>
  