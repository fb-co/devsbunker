import Vue from 'vue'
import App from './App.vue'
import router from './router'

// stylesheets imports SRC -> https://renatello.com/vue-js-external-css/


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
