<template>
	<div style="margin: -20px;">
		<el-card shadow="never">
			<el-tabs v-model="tabIndex" @tab-click="tabClick">
			  <el-tab-pane label="管理员列表">
				
				<div class="d-flex align-items-center mb-3">
					<router-link :to="{name:'set_manager_create-manager'}">
					<el-button type="primary" size="mini">添加用户</el-button>
					</router-link>
					<div class="ml-auto">
						<el-input size="mini" style="width: 150px;" 
						placeholder="请输入用户名" class="mr-2"></el-input>
						<el-button size="mini" type="info">搜索</el-button>
					</div>
				</div>
				
				<!-- 表格 -->
				<el-table border
				:data="managerList"
				tooltip-effect="dark"
				style="width: 100%"
				>
				<!-- 
				用户头像
				登录账号
				手机号
				邮箱
				所属用户组
				状态	
				操作
				 -->
				 <!-- 用户头像 -->
				<el-table-column label="用户头像" align="center" width="100">
					<template slot-scope="scope">
						<el-avatar class="mr-3 align-self-center" size="medium" 
						:src="scope.row.avatar"></el-avatar>
					</template>
				</el-table-column>
				<!-- 登录账号 -->
				<el-table-column label="登录账号" align="center"
				prop="username"></el-table-column>
				<!-- 手机号 -->
				<el-table-column label="手机号" align="center"
				prop="phone"></el-table-column>
				<!-- 邮箱 -->
				<el-table-column label="邮箱" align="center"
				prop="email"></el-table-column>
				<!-- 所属用户组 -->
				<el-table-column label="所属用户组" align="center">
					<template slot-scope="scope">
						管理员
					</template>
				</el-table-column>
				<!-- 状态 -->
				<el-table-column prop="status" label="状态" align="center"
				width="100">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.status"
						:active-value="1" :inactive-value="0"></el-switch>
					</template>
				</el-table-column>
				<!-- 操作 -->
				<el-table-column align="center" width="250" label="操作">
				  <template slot-scope="scope">
					  <el-button type="text">修改</el-button>
					  <el-button type="text">重置密码</el-button>
					  <el-button type="text">删除</el-button>
				  </template>
				</el-table-column>
				</el-table>
				<!-- 分页 -->
				<sum-page :current-page="currentPage"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange" />
				
				
			  </el-tab-pane>
			  <el-tab-pane label="角色列表">
			  	<div class="d-flex align-items-center mb-3">
			  		<router-link :to="{name:'set_manager_create-group'}">
			  		<el-button type="primary" size="mini">添加角色</el-button>
			  		</router-link>
			  	</div>
				
				
				<el-table border
				:data="groupList"
				tooltip-effect="dark"
				style="width: 100%"
				>
				<!-- 
				角色名称	
				添加时间	
				操作
				 -->
				<!-- 角色名称 -->
				<el-table-column label="角色名称" align="center"
				prop="name"></el-table-column>
				<!-- 添加时间 -->
				<el-table-column label="添加时间" align="center"
				prop="create_time"></el-table-column>
				<!-- 状态 -->
				<el-table-column prop="status" label="状态" align="center"
				width="100">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.status"
						:active-value="1" :inactive-value="0"></el-switch>
					</template>
				</el-table-column>
				<!-- 操作 -->
				<el-table-column align="center" width="250" label="操作">
				  <template slot-scope="scope">
					  <el-button type="text">修改</el-button>
					  <el-button type="text">删除</el-button>
				  </template>
				</el-table-column>
				</el-table>
				
				
				
			  </el-tab-pane>
			  <el-tab-pane label="权限列表">
				  
				  <el-tree :data="data" node-key="id" default-expand-all 
				  :expand-on-click-node="false" 
				  @node-drop="handleDrop" draggable>
				  	<span class="custom-tree-node" slot-scope="{ node, data }">
				  		<div class="d-flex">
				  			<el-input v-model="data.label" 
				  			v-show="data.editStatus" clearable
				  			size="mini"></el-input>
							<el-input class="ml-2" v-model="data.name" 
							v-show="data.editStatus" clearable
							size="mini"></el-input>
							<el-tooltip effect="dark" 
							:content="`name值  ${data.name}`" 
							placement="right">
							<span v-show="!data.editStatus">{{data.label}}</span>
							</el-tooltip>
				  			
				  		</div>
				  		<span>
				  			<!-- 显示隐藏 -->
				  			<el-button :type="data.status?'success':'danger'"
				  			size="mini" plain
				  			@click="data.status = !data.status">
				  			{{data.status ? '启用' : '禁用'}}</el-button>
				  			<el-button size="mini" type="success"
				  			@click="append(data)">
				  				增加
				  			</el-button>
				  			<!-- 修改 -->
				  			<el-button size="mini" 
				  			:type="!data.editStatus?'warning':'default'"
				  			@click="data.editStatus = !data.editStatus">
				  				{{data.editStatus ? '完成':'修改'}}
				  			</el-button>
				  			<!-- 删除 -->
				  			<el-button size="mini" type="danger"
				  			@click="remove(node, data)">
				  				删除
				  			</el-button>
				  		</span>
				  	</span>
				  </el-tree>
				  
				  
			  </el-tab-pane>
			</el-tabs>
		</el-card>
		
	</div>
</template>

<script>
	let id = 1000;
	import page from '@/common/mixins/page.js';
	export default {
		mixins:[page],
		data() {
			return {
				tabIndex:0,
				managerList:[
					{
						id:10,
						username:"用户名",
						avatar:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=27&gp=0.jpg",
						phone:"15648897641",
						email:"15648897641@163.com",
						group_id:1,
						group:{
							id:1,
							name:'管理员'
						},
						status:1,//启用
					}
				],
				groupList:[
					{
						name:"超级管理员",
						create_time:"2019-07-23"
					}
				],
				data: [{
					id: 1,
					label: '一级 1',
					name:"shop_goods",
					status:1,
					editStatus:false,
					children: [{
						id: 9,
						label: '三级 1-1-1',
						status:1,
						name:"shop_goods",
						editStatus:false,
					}, {
						id: 10,
						label: '三级 1-1-2',
						status:0,
						name:"shop_goods",
						editStatus:false,
					}]
				}, {
					id: 2,
					label: '一级 2',
					status:0,
					name:"shop_goods",
					editStatus:false,
					children: [{
						id: 5,
						label: '二级 2-1',
						name:"shop_goods",
						status:1,
						editStatus:false,
					}, {
						id: 6,
						label: '二级 2-2',
						name:"shop_goods",
						status:1,
						editStatus:false,
					}]
				}, {
					id: 3,
					label: '一级 3',
					status:1,
					name:"shop_goods",
					editStatus:false,
					children: [{
						id: 7,
						label: '二级 3-1',
						status:1,
						name:"shop_goods",
						editStatus:false,
					}, {
						id: 8,
						label: '二级 3-2',
						status:1,
						name:"shop_goods",
						editStatus:false,
					}]
				}]
			}
		},
		created() {
			// 初始化tabIndex
			this.tabIndex = localStorage.getItem('ManagerTabIndex') || '0'
		},
		methods: {
			tabClick(e){
				localStorage.setItem('ManagerTabIndex',e.index)
			},
			append(data) {
				const newChild = {
					id: id++,
					label: '新增分类'+id++,
					status:1,
					editStatus:true,
					children: []
				};
				if (!data.children) {
					this.$set(data, 'children', []);
				}
				data.children.push(newChild);
			},
			remove(node, data) {
				const parent = node.parent;
				const children = parent.data.children || parent.data;
				const index = children.findIndex(d => d.id === data.id);
				children.splice(index, 1);
			},			
			handleDrop(draggingNode, dropNode, dropType, ev) {
				//console.log('tree drop: ', dropNode.label, dropType);
				console.log(draggingNode.data);
				console.log(dropNode.data);
				console.log(dropType);
				console.log(ev);
			},
		},
	}
</script>

<style>
</style>
