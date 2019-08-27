<template>
	<div style="margin: -20px;">
		<el-card shadow="never">
			
			<div slot="header" class="d-flex align-items-center" 
			style="margin-bottom: -10px;">
				<el-button type="primary" size="mini"
				@click="dialogModel = true">添加会员</el-button>
				<div class="ml-auto" v-show="!superSearchShow">
					<el-input size="mini" style="width: 150px;" 
					v-model="search.keyword"
					placeholder="手机号/邮箱/会员昵称" class="mr-2"></el-input>
					<el-button size="mini" type="info">搜索</el-button>
					<el-button size="mini" 
					@click="superSearchShow = true">高级搜索</el-button>
				</div>
			</div>
			
			<!-- 高级搜索 -->
			<el-card class="box-card mt-2 bg-light" 
			v-show="superSearchShow"
			:body-style="{'padding':'10px'}">
				<div slot="header" class="d-flex align-items-center" 
				style="margin: -10px;">
					<span>高级搜索</span>
					<el-button class="m-0 p-0 ml-auto" type="text" 
					@click="superSearchShow = false">收起</el-button>
				</div>
				<el-form inline ref="form" :model="search" label-width="80px">
					<el-form-item label="搜索内容">
						<el-input v-model="search.keyword" 
						placeholder="手机号/邮箱/会员昵称" 
						size="mini"></el-input>
					</el-form-item>
					<el-form-item label="会员等级">
						<el-select v-model="search.level_id" size="mini"
						placeholder="请选择会员等级">
							<el-option label="普通会员" 
							:value="1"></el-option>
							<el-option label="黄金会员" 
							:value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="发布时间">
						<el-date-picker
						  v-model="search.time"
						  type="daterange"
						  align="right"
						  unlink-panels
						  range-separator="至"
						  start-placeholder="开始日期"
						  end-placeholder="结束日期"
						  :picker-options="pickerOptions"
						  size="medium">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button class="ml-2" type="info" 
						size="mini">搜索</el-button>
						<el-button size="mini" 
						@click="clearForm">清空筛选条件</el-button>
					</el-form-item>
				</el-form>
			</el-card>
			
			<!-- 表格 -->
			<el-table border
			:data="list"
			tooltip-effect="dark"
			style="width: 100%"
			>
			<!-- 
			会员	
			会员等级		
			注册/登录	
			状态	
			操作
			 -->
			 <!-- 会员 -->
			<el-table-column label="会员" align="left">
				<template slot-scope="scope">
					<div class="media">
						<el-avatar class="mr-3 align-self-center" size="medium" 
						:src="scope.row.avatar"></el-avatar>
						<div class="media-body">
							<div class="d-flex align-items-center">
								<h6 class="mr-auto">{{scope.row.username}}</h6>
								<el-button type="text">详情</el-button>
							</div>
							用户id：{{scope.row.id}}
						</div>
					</div>
				</template>
			</el-table-column>
			<!-- 会员等级 -->
			<el-table-column label="会员等级" align="center" width="100">
				<template slot-scope="scope">
					{{scope.row.level.name}}
				</template>
			</el-table-column>
			<!-- 注册/登录 -->
			<el-table-column prop="price" label="注册/登录" align="center">
				<template slot-scope="scope">
					<div class="text-muted">
						注册时间 : {{scope.row.create_time}}</div>
					<div class="text-muted">
						最后登录 : {{scope.row.update_time}}</div>
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
		</el-card>
		

		<!-- 添加会员 -->
		<el-dialog title="添加会员" :visible.sync="dialogModel" top="5px">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="用户名">
					<el-input v-model="form.username" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="form.password" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="昵称">
					<el-input v-model="form.nickname" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="头像">
					<div class="d-flex">
						<el-upload
						  class="avatar-uploader"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  :show-file-list="false" :limit="1">
						  <img v-if="form.avatar" :src="form.avatar" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</div>
				</el-form-item>
				<el-form-item label="等级">
					<el-select v-model="form.level_id" size="mini"
						placeholder="请选择会员等级">
							<el-option label="普通会员" 
							:value="1"></el-option>
							<el-option label="黄金会员" 
							:value="2"></el-option>
						</el-select>
				</el-form-item>
				<el-form-item label="手机">
					<el-input v-model="form.phone" size="mini" 
					type="number"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="form.email" size="mini" 
					type="email"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="form.sex" size="mini">
						<el-radio-button :label="0">保密</el-radio-button>
						<el-radio-button :label="1">男</el-radio-button>
						<el-radio-button :label="2">女</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="状态">
					<el-switch v-model="form.status"
					:active-value="1" :inactive-value="0"></el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogModel = false"
				size="mini">取 消</el-button>
				<el-button type="primary" @click="dialogModel = false"
				size="mini">确 定</el-button>
			</div>
		</el-dialog>
		

	</div>
</template>

<script>
	import page from '@/common/mixins/page.js';
	import timeSelect from "@/common/mixins/timeSelect.js"
	export default {
		mixins:[page,timeSelect],
		data() {
			return {
				dialogModel:false,
				form:{
					username:"",
					password:"",
					nickname:"",
					avatar:"",
					level_id:1,
					phone:"",
					email:"",
					sex:0,
					status:1,//启用
				},
				superSearchShow:false,
				search:{
					keyword:"",
					time:"",
					level_id:0,
				},
				upCondition:1,//1累计消费 2累计次数
				// 列表数据
				list:[
					{
						id:10,
						username:"用户名",
						avatar:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=27&gp=0.jpg",
						level_id:1,
						level:{
							id:1,
							name:'普通会员'
						},
						create_time:"2019-07-24 15:52:56",
						update_time:"2019-07-24 15:52:56",
						status:1,//启用
					}
				]
			}
		},
		methods: {
			// 修改
			handleEdit(index, row){
				this.$router.push({name:"user_user-level_create"})
			},
			// 删除
			handleDelete(index, row) {
				this.$confirm('是否删除该信息？','提示',{
					type:"warning"
				}).then(()=>{
					this.list.splice(index,1)
					this.$message({ type:"success",message:"删除成功" })
				});
			},
			// 清除条件
			clearForm(){
				this.search = {
					keyword:"",
					time:"",
					level_id:0,
				}
			}
		},
	}
</script>

<style>
	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
