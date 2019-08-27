import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 引入路由配置文件
import routes from "./common/config/router.js"

export default new Router({ routes })