<template>
	<div style="margin: -20px;">
		<el-card shadow="never">
			
			<div slot="header" class="d-flex align-items-center" style="margin-bottom: -10px;">
				<div class="d-flex ml-auto">
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
					<el-input v-model="search.number" size="medium" 
					placeholder="请输入订单编号" class="ml-3"
					style="width: 200px;"></el-input> 
					<el-button type="info" size="mini"
					class="ml-3">搜索</el-button>
				</div>
			</div>
			<!-- 表格 -->
			<el-table border
			ref="multipleTable"
			:data="list"
			tooltip-effect="dark"
			style="width: 100%"
			@selection-change="handleSelectionChange">
			<el-table-column type="selection" width="40" align="center" />
			<!-- 
			订单编号		number
			用户名		username
			开票金额		price
			抬头			title
			发票内容		content
			纳税人识别号  ident
			创建时间		create_time
			操作
			 -->
			 <!-- 订单编号 -->
			<el-table-column prop="number" label="订单编号" align="center"/>
			<!-- 用户名 -->
			<el-table-column prop="username" label="用户名" align="center"/>
			<!-- 开票金额 -->
			<el-table-column prop="price" label="开票金额" align="center" />
			<!-- 抬头 -->
			<el-table-column prop="title" label="抬头" align="center" />
			<!-- 发票内容 -->
			<el-table-column prop="content" label="发票内容" align="center" />
			<!-- 纳税人识别号 -->
			<el-table-column prop="ident" label="纳税人识别号" align="center" />
			<!-- 创建时间 -->
			<el-table-column prop="create_time" label="创建时间" align="center" />
			<!-- 操作 -->
			 <el-table-column align="center" width="150">
			  <template slot="header" slot-scope="scope">
				操作
			  </template>
			  <template slot-scope="scope">
				  <el-button-group>
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
				// 选中列表
				multipleSelection: [],
				// 列表数据
				/**
				订单编号		number
				用户名		username
				开票金额		price
				抬头			title
				发票内容		content
				纳税人识别号  ident
				创建时间		create_time
				 * **/
				list:[],
				search:{
					time:"",
					number:""
				}
			}
		},
		filters: {
			getName(value) {
				let arr = value.map(v=>{
					return v.name
				})
				return arr.join(',')
			}
		},
		methods: {
			// 选中
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 删除选中
			deleteAll(){
				this.$confirm('是否删除选中？','提示',{
					type:"warning"
				}).then(()=>{
					// 找出没有选中的元素，过滤已选中
					let list = this.list.filter((v)=>{
						return !this.multipleSelection.some((item)=> item.id === v.id)
					})
					this.list = list
					// 清空chooseList
					this.multipleSelection = []
					this.$message({
						type:"success",message:"删除成功"
					})
				})
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
