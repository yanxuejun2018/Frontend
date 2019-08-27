import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import './plugins/element.js'
import store from './store'


//引入配置文件
import $conf from "./common/config/config.js"
Vue.prototype.$conf = $conf
// 引入拖拽
import VueDND from 'awe-dnd'
Vue.use(VueDND)

// 全局loading
Vue.prototype.$_loading = null

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
