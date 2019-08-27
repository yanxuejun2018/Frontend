<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
  	return {
  		
  	}
  },
  components: {
    
  },
  created() {
  	this.$_loading =  this.$loading({
  	  lock: true,
  	  text: 'Loading',
  	  spinner: 'el-icon-loading',
  	  background: 'rgba(0, 0, 0, 0.7)'
  	});
  },
  mounted(){
	setTimeout(()=>{
		this.$_loading.close()
	},2000)
  }
}
</script>

<style>
@import url("assets/css/common.css");
</style>
