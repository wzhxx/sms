import Vue from 'vue'
import App from './App.vue'
// import router from './router'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from 'axios'
Vue.prototype.$http= axios

import animated from 'animate.css'

Vue.use(animated)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
