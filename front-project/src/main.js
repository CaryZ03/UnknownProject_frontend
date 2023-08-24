import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
// import api from './api';
import AllIosIcon from "vue-ionicons/dist/ionicons-ios.js";

//全局使用ionicons图标
Vue.use(AllIosIcon);
Vue.use(ElementUI);
Vue.config.productionTip = false
// Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
