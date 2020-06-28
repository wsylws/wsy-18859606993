import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/main.less';
import mixins from './mixins/global';
import App from './App.vue';
import router from './router';
import store from './store';
// import './permission';


Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'medium'
});
Vue.mixin(mixins);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
