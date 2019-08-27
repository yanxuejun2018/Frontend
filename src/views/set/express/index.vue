<template>
	<div style="margin: -20px;">
		<el-card shadow="never">
			<el-tabs v-model="tabIndex">
			  <el-tab-pane label="运费模板">
				<div class="d-flex align-items-center mb-3">
					<el-button type="primary" size="mini">添加模板</el-button>
				</div>
				<el-table border
				:data="list"
				tooltip-effect="dark"
				style="width: 100%"
				>
				<!-- 
				模板名称
				计费方式
				排序
				添加时间
				操作
				 -->
				 <!-- 模板名称 -->
				<el-table-column prop="name" label="模板名称" align="center" />
				 <!-- 计费方式 -->
				<el-table-column label="计费方式" align="center">
					<template slot-scope="scope">
						{{scope.row.type|getType}}
					</template>
				</el-table-column>
				 <!-- 排序 -->
				<el-table-column prop="order" label="排序" align="center" />
				 <!-- 添加时间 -->
				<el-table-column prop="create_time" label="添加时间" align="center" />
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
			  <el-tab-pane label="物流跟踪">
			  	<el-form ref="form" :model="form" label-width="140px">
			  		<el-form-item label="快递100 Customer">
			  			<el-input class="w-50" v-model="form.customer" 
			  			size="medium"></el-input>
						<small class="d-block text-muted">
							用于查询物流信息，<el-button type="text" size="mini">快递100申请</el-button></small>
			  		</el-form-item>
			  		<el-form-item label="快递100 Key">
			  			<el-input class="w-50" v-model="form.key" 
			  			size="medium"></el-input>
			  		</el-form-item>
			  		<el-form-item>
			  			<el-button type="primary" size="medium">保存</el-button>
			  		</el-form-item>
			  	</el-form>
			  </el-tab-pane>
			</el-tabs>
		</el-card>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex:0,
				form:{
					customer:"",
					key:""
				},
				list:[
					{
						name:"全国统一邮费",
						type:1,
						create_time:"2019-07-17 16:29:32",
						status:1,
						order:100
					}
				]
			}
		},
		filters: {
			getType(value) {
				let arr = ['按件数','按数量']
				return arr[value-1];
			}
		}
	}
</script>

<style>
</style>
