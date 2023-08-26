import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import api from './api';
import AllIosIcon from "vue-ionicons/dist/ionicons-ios.js";
// import api from './api';
Vue.prototype.$api = api;


import VueKonva from 'vue-konva'

import TDesign from 'tdesign-vue';

// 引入组件库的少量全局样式变量
import 'tdesign-vue/es/style/index.css';

Vue.use(TDesign);
// VueDraggableResizable
import VueDraggableResizable from 'vue-draggable-resizable'
Vue.component('vue-draggable-resizable', VueDraggableResizable)

//全局使用ionicons图标
Vue.use(VueKonva);
Vue.use(AllIosIcon);
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
