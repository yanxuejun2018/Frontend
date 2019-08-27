<template>
	<div style="margin: -20px;">
		<el-card shadow="never">
			
			<div slot="header" class="clearfix" style="margin-bottom: -10px;">
				<el-button type="success" size="mini" @click="create">
					添加规格
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
			规格名称：  			name
			规格排序：0  			order
			是否启用： 是否		status
			展示方式：   文字    颜色    图片		type
			*规格值： 			value
			 -->
			 <!-- 规格名称 -->
			<el-table-column prop="name" label="规格名称" align="center"/>
			<!-- 规格值 -->
			<el-table-column prop="value" label="规格值" 
			align="left" width="400" />
			<!-- 排序 -->
			<el-table-column prop="order" label="商品排序"
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
		
		<!-- 添加规格 -->
		<el-dialog :title="dialogType ==='create'?'添加规格':'修改规格'" 
		:visible.sync="dialogShow">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="规格名称">
					<el-input v-model="form.name" size="mini" 
					placeholder="规格名称"
					style="width: 150px;"></el-input>
				</el-form-item>
				<el-form-item label="排序">
					<el-input-number v-model="form.order" :min="0" size="mini" />
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="form.status">
						<el-radio :label="1" border size="mini">启用</el-radio>
						<el-radio :label="0" border size="mini">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="类型">
					<el-radio-group v-model="form.type">
						<el-radio :label="1" border size="mini">文字</el-radio>
						<el-radio :label="2" border size="mini">颜色</el-radio>
						<el-radio :label="3" border size="mini">图片</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="规格值">
					<el-input v-model="form.value" type="textarea" rows="4"
					placeholder="一行为一个规格项，多个规格项用换行输入"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogShow = false">取 消</el-button>
				<el-button type="primary" @click="dialogSubmit">确 定</el-button>
			</div>
		</el-dialog>
		
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
				list:[],
				// 添加/修改规格
				dialogShow:false,
				dialogType:"create",
				form:{
					name:"",
					order:50,
					status:1,	// 0禁用 1启用
					type:1,		// 1文字 2颜色 3图片
					value:""
				}
			}
		},
		mounted(){
			this.__init()
		},
		methods: {
			__init(){
				for (let i = 0; i < 20; i++) {
					this.list.push({
						id:i+1,
						name:"颜色",
						order:50,
						status:1,	// 0禁用 1启用
						type:1,		// 1文字 2颜色 3图片
						value:"棕色,蓝色"
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
				this.dialogShow = true
			},
			// 模态框确定
			dialogSubmit(){
				this.dialogShow = false
			},
			// 编辑
			handleEdit(index, row) {
				console.log(index, row);
			},
			// 删除
			handleDelete(index, row) {
				console.log(index, row);
			},
		},
	}
</script>

<style>
</style>
