import Vue from 'vue';
import VueBus from 'vue-bus';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App';
import router from './router';

import utils from '@/utils/utils';
Vue.prototype.utils = utils;
Vue.use(VueBus);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.use(ElementUI);

// Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  components: { App },
  router,
  // store,
  template: '<App/>'
}).$mount('#app')
