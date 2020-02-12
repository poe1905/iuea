import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

//引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入请求模块
import  './utils/request';
import echarts from 'echarts' //引入echarts 图表模块
Vue.prototype.$echarts = echarts //挂载vue 原型 实现全局调用
Vue.use(ElementUI);
// // 解决路由重复问题
// import Router from 'vue-router'
// Vue.component('ValidationProvider', ValidationProvider)
// Vue.component('ValidationObserver', ValidationObserver)
// // 注册开始
// for (let rule in rules) {
//   extend(rule, {
//     ...rules[rule], // add the rule
//     message: zhCN.messages[rule] // add its message
//   })
// }
// // 注册结束
// Vue.config.productionTip = false

// const originalPush = Router.prototype.push
// Router.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
