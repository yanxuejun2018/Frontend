<template>
	<div style="margin: -20px;">
		<el-card shadow="never">
			
			<div slot="header" class="clearfix" style="margin-bottom: -10px;">
				<el-button type="success" size="mini" @click="create">
					添加类型
				</el-button>
				<el-button type="danger" size="mini" @click="deleteAll">
					批量删除
				</el-button>
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
			类型名称				name
			属性排序				order
			是否启用： 是否		status
			关联规格： （关联多个）sku_list
 			可填写值：			value_list
 				排序	属性名称	所属类型	是否筛选	属性值	操作
			 -->
			 <!-- 类型名称 -->
			<el-table-column prop="name" label="类型名称" align="center"/>
			<!-- 属性标签 -->
			<el-table-column label="属性标签" align="left" width="400">
				<template slot-scope="scope">
					{{scope.row.value_list | getName}}
				</template>
			</el-table-column>
			<!-- 属性排序 -->
			<el-table-column prop="order" label="属性排序"
			show-overflow-tooltip align="center" />
			<!-- 启用 -->
			<el-table-column prop="status" label="状态"
			  show-overflow-tooltip align="center">
			  <template slot-scope="scope">
				  <el-button plain size="mini"
				  @click="scope.row.status = !scope.row.status"
				  :type="scope.row.status?'success':'danger'">
					  {{ scope.row.status ? '启用' : '禁用' }}
				  </el-button>
			  </template>
			</el-table-column>
			<!-- 操作 -->
			 <el-table-column align="center" width="150">
			  <template slot="header" slot-scope="scope">
				操作
			  </template>
			  <template slot-scope="scope">
				  <el-button-group>
					  <el-button  size="mini" type="success" plain
					  @click="handleEdit(scope.$index, scope.row)">
					  编辑
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
	export default {
		mixins:[page],
		data() {
			return {
				// 选中列表
				multipleSelection: [],
				// 列表数据
				/**
				类型名称				name
				属性排序				order
				是否启用： 是否		status
				关联规格： （关联多个）skulist
				可填写值：			valuelist
					排序		order
					属性名称 name
					所属类型 type
					是否启用 status
					属性值	value	//1输入框 2单选框 3复选框
					操作	
				 * **/
				list:[]
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
		mounted(){
			this.__init()
		},
		methods: {
			__init(){
				for (let i = 0; i < 20; i++) {
					this.list.push({
						name:"鞋子",
						order:50,
						status:1,
						sku_list:[
							{ id:1,name:"颜色" },
							{ id:2,name:"尺寸" }
						],
						value_list:[
							{
								order:50,
								name:"特性",
								type:1,		
								value:""
							},
							{
								order:50,
								name:"电池",
								type:1,		
								value:""
							}
						]
					})
				}
			},
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
			// 增加
			create(){
				this.$router.push({ name:"shop_type_create" })
			},
			// 编辑
			handleEdit(index, row) {
				console.log(index, row);
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
