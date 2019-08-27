<template>
	<div style="margin: -20px;">
		<el-card shadow="never">
			
			<div slot="header" class="d-flex align-items-center" 
			style="margin-bottom: -10px;">
				<router-link :to="{name:'user_user-level_create'}">
					<el-button type="primary" size="mini">添加等级</el-button>
				</router-link>
				<div class="ml-auto d-flex align-items-center">
					<span class="mr-2 text-muted small">选择升级标准：</span>
					<el-radio-group v-model="upCondition" size="mini">
						<el-radio-button :label="1" class="mb-0">
							累计消费</el-radio-button>
						<el-radio-button :label="2" class="mb-0">
							累计次数</el-radio-button>
					</el-radio-group>
				</div>
			</div>
			<!-- 表格 -->
			<el-table border
			:data="list"
			tooltip-effect="dark"
			style="width: 100%"
			>
			<!-- 
			等级名称
			升级条件
			折扣率（%）
			等级序号
			状态
			操作
			 -->
			 <!-- 等级名称 -->
			<el-table-column prop="name" label="等级名称" align="center"/>
			<!-- 升级条件 -->
			<el-table-column label="升级条件" align="center">
				<template slot-scope="scope">
					{{getCondition.name+':'+scope.row[getCondition.value]}}
				</template>
			</el-table-column>
			<!-- 折扣率（%） -->
			<el-table-column prop="price" label="折扣率（%）" align="center">
				<template slot-scope="scope">
					{{scope.row.discont*10}}
				</template>
			</el-table-column>
			<!-- 等级序号 -->
			<el-table-column prop="level" label="等级序号" align="center" />
			<!-- 状态 -->
			<el-table-column prop="status" label="状态" align="center">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.status"
					:active-value="1" :inactive-value="0"></el-switch>
				</template>
			</el-table-column>
			<!-- 操作 -->
			<el-table-column align="center" width="150">
			  <template slot="header" slot-scope="scope">
				操作
			  </template>
			  <template slot-scope="scope">
				  <el-button-group>
					  <el-button type="success" size="mini" plain
					  @click="handleEdit(scope.$index, scope.row)">
					  修改
					  </el-button>
					  <el-button type="danger" size="mini" plain
					  @click="handleDelete(scope.$index, scope.row)">
					  删除
					  </el-button>
					</el-button-group>
			  </template>
			</el-table-column>
			</el-table>
			<!-- 分页 -->
			<sum-page :current-page="currentPage"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange" />
		</el-card>
		

	</div>
</template>

<script>
	import page from '@/common/mixins/page.js';
	import timeSelect from "@/common/mixins/timeSelect.js"
	export default {
		mixins:[page,timeSelect],
		data() {
			return {
				upCondition:1,//1累计消费 2累计次数
				// 列表数据
				list:[
					{
						name:"普通会员",
						consume:100,
						times:10,
						discont:10,
						level:1,
						status:1,//启用
						create_time:"",
					}
				]
			}
		},
		computed: {
			getCondition() {
				let arr = [
					{ name:"累计消费",value:"consume" },
					{ name:"累计次数",value:"times" },
				]
				return arr[this.upCondition-1]
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
		},
	}
</script>

<style>
</style>
