import Vue from 'vue'
import Vuex from 'vuex'

import goodsCreate from "@/store/modules/goods_create"

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
	goodsCreate
  }
})
