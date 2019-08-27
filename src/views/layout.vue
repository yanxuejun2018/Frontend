<template>
	<div>
		<!-- 主布局 -->
		<el-container>
			<el-header style="background: #525C64;">
				<div class="d-flex justify-content-between align-items-center">
					<a class="h5 mb-0 text-light">{{$conf.logo}}</a>
					<el-menu
					  :default-active="headNavBars.active"
					  class="el-menu-demo"
					  mode="horizontal"
					  @select="headNavBarsSelect"
					  background-color="#545c64"
					  text-color="#fff"
					  active-text-color="#ffd04b">
					  
					  <el-menu-item v-for="(item,index) in headNavBars.list" 
					  :key="index" 
					  :index="index|numToString">{{item.name}}</el-menu-item>

					  <el-submenu index="100">
						<template slot="title">
							<el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
							Summer</template>
						<el-menu-item index="100-1">清除缓存</el-menu-item>
						<el-menu-item index="100-2">修改密码</el-menu-item>
						<el-menu-item index="100-3">退出登录</el-menu-item>
					  </el-submenu>
					</el-menu>
				</div>
			</el-header>
			<el-container>
				<el-aside width="180px">
					<el-menu
					  style="height: 100%;"
					  default-active="2"
					  class="el-menu-vertical-demo"
					  :default-active="currentAsideActive"
					  @select="AsideSelect">
					  
					  <el-menu-item 
					  v-for="(item,index) in currentAside"
					  :index="index|numToString"
					  :key="index">
						<i :class="item.icon"></i>
						<span slot="title">{{item.name}}</span>
					  </el-menu-item>
					  
					</el-menu>
				</el-aside>
				<el-main class="bg-light">
					<!-- 面包屑导航 -->
					<div class="card mb-2 rounded-0 border-top-0 border-left-0 border-right-0" style="margin: -20px;" v-if="Breadcrumbs.length > 0">
						<div class="card-body py-3">
							<el-breadcrumb separator-class="el-icon-arrow-right">
							  <el-breadcrumb-item v-for="(item,index) in Breadcrumbs"
							  :key="index" :to="{ path: item.path }">
								{{item.title}}
							  </el-breadcrumb-item>
							</el-breadcrumb>
						</div>
					</div>
					<!-- 主内容 -->
					<router-view></router-view>
					
					<!-- 回到顶部 -->
					<el-backtop target=".el-main"></el-backtop>
					
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import commonMixins from "../common/mixins/common.js"
	export default {
		mixins:[commonMixins],
		data() {
			return {
				// 导航
				headNavBars:false,
				// 面包屑导航
				Breadcrumbs:[]
			}
		},
		mounted(){
			// 加载配置
			this.headNavBars = this.$conf.headNavBars;
			// 加载面包屑导航
			this.getRouterBran();
			// 修改当前选中菜单
			this.__initAside()
		},
		computed: {
			// 当前侧边导航
			currentAside() {
				return this.headNavBars ? this.headNavBars.list[this.headNavBars.active].aside.list : [];
			},
			// 当前选中侧边导航
			currentAsideActive:{
				get(){
					return this.headNavBars ? this.headNavBars.list[this.headNavBars.active].aside.active : '0';
				},
				set(val){
					this.headNavBars.list[this.headNavBars.active].aside.active = val
				}
			}
		},
		// 监听路由变化
		watch: {
			'$route' (to, from) {
				localStorage.setItem('NavActive',JSON.stringify({
					top:this.headNavBars.active || '0',
					aside:this.currentAsideActive || '0'
				}))
				this.getRouterBran();
			},
		},
		methods: {
			// 获取面包屑导航
			getRouterBran () {
				let Breadcrumbs = this.$route.matched.filter(item => item.name)
				let arr = [];
				Breadcrumbs.forEach((k,v)=>{
					// 去除layout
					if (k.name === "layout" || k.name === "index") return;
					arr.push({ name:k.name,path:k.path,title:k.meta.title })
				})
				if (arr.length > 0) {
					arr.unshift({name:"index",path:"/index",title:"后台首页"})
				}
				this.Breadcrumbs = arr;
			},
			// 进入页面默认选中当前导航
			__initAside(){
				let obj = localStorage.getItem('NavActive')
				if (obj) {
					obj = JSON.parse(obj)
					this.headNavBars.active = obj.top
					this.currentAsideActive = obj.aside
				}
			},
			// 顶部导航选中
			headNavBarsSelect(key, keyPath) {
				this.headNavBars.active = key;
				// 回归第一个
				this.headNavBars.list[key].aside.active = '0'
				// 打开第一个分类
				this.$router.push({ name:this.currentAside[0].pathname });
			},
			// 侧边导航选中
			AsideSelect(key, keyPath) {
				this.headNavBars.list[this.headNavBars.active].aside.active = key
				// 跳转
				this.$router.push({ name:this.currentAside[key].pathname });
			},
		}
	}
</script>

<style scoped>
  .el-aside {
	position: absolute;
	bottom: 0;
	top: 60px;
  }
  
  .el-main {
	position: absolute;
	left: 180px;
	bottom: 0;
	right: 0;
	top: 60px;
  }
</style>
