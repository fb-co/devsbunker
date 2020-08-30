import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store/store.js'; // Import vuex store

/* Cookies Parser */
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);
Vue.$cookies.config('30d');
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');