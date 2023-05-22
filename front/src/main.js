import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import axios from 'axios'
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.prototype.$http = axios;

// 중복된 네비게이션 오류 처리
const originalPush = router.push;
router.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      throw err;
    }
  });
};

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
