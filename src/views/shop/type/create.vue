<template>
	<div style="margin: -20px;">
		<router-link :to="{name:'shop_type_list'}" style="position: absolute;top: 10px;left: 200px;">
			<el-button size="mini" icon="el-icon-arrow-left">回到类型列表</el-button>
		</router-link>
		<el-card shadow="never" :body-style="{'padding':'20px 20px'}">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="类型名称">
					<el-input v-model="form.name" size="medium"
					style="width: 150px;"></el-input>
				</el-form-item>
				<el-form-item label="属性排序">
					<el-input-number v-model="form.order" :min="1"
					size="mini"></el-input-number>
				</el-form-item>
				<el-form-item label="是否启用">
					<el-radio-group v-model="form.status">
						<el-radio :label="1" border size="medium">启用</el-radio>
						<el-radio :label="0" border size="medium">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="关联规格">
					<div class="d-flex h-100">
						<div class="d-flex">
							<span 
							class="border py-1 px-2 rounded goods_type_item mr-2">
								<font>颜色</font>
								<i class="el-icon-delete"></i>
							</span>
						</div>
						<el-button size="mini"
						icon="el-icon-plus"></el-button>
					</div>
				</el-form-item>
				<el-form-item label="属性列表">
					 <el-table
					  :data="form.value_list"
					  style="width: 100%">
					  <el-table-column
						label="排序" align="center"
						width="100">
						<template slot-scope="scope">
							<el-input v-model="scope.row.order" size="mini" 
							type="number"></el-input>
						</template>
					  </el-table-column>
					  <el-table-column
						label="属性名称">
						<template slot-scope="scope">
							<el-input v-model="scope.row.name" size="mini">
							</el-input>
						</template>
					  </el-table-column>
					  <el-table-column width="150"
						label="	所属类型">
						<template slot-scope="scope">
							<el-select v-model="scope.row.type" 
							placeholder="请选择所属类型" size="mini">
								<el-option label="输入框" :value="1"></el-option>
								<el-option label="单选框" :value="2"></el-option>
								<el-option label="多选框" :value="3"></el-option>
							</el-select>
						</template>
					  </el-table-column>
					  <el-table-column width="80"
						label="	是否显示" align="center">
						<template slot-scope="scope">
							<el-switch
							  v-model="scope.row.status"
							  active-color="#13ce66"
							  inactive-color="#ff4949"
							  :active-value="1"
							  :inactive-value="0">
							</el-switch>
						</template>
					  </el-table-column>
					  <el-table-column width="300"
						label="	属性值">
						<template slot-scope="scope">
							<el-input v-model="scope.row.value" 
							rows="3" type="textarea" v-if="scope.row.edit"
							placeholder="一行为一个属性值，多个属性值用换行输入">
							</el-input>
							<span v-else>{{scope.row.value}}</span>
						</template>
					  </el-table-column>
					  <el-table-column width="150"
						label="操作" align="center">
						<template slot-scope="scope">
							<el-button type="text" size="mini" 
							@click="editRow(scope)"
							v-if="scope.row.type !== 1">
								{{!scope.row.edit ? '编辑属性值':'完成'}}
							</el-button>
							<el-button type="text" size="mini"
							@click="deleteRow(scope.$index)">删除</el-button>
						</template>
					  </el-table-column>
					</el-table>
				</el-form-item>
				<el-form-item>
					<el-button type="text" size="mini" icon="el-icon-plus"
					@click="addValue">
						添加一个属性</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
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
							status:1,
							value:"",
							edit:false
						},
						{
							order:50,
							name:"电池",
							type:2,		
							status:1,
							value:"",
							edit:false
						}
					]
				}
			}
		},
		methods: {
			// 编辑属性
			editRow(scope) {
				if (scope.row.edit) {
					this.$message({type:"success",message:"修改成功"})
				}
				scope.row.edit = !scope.row.edit
			},
			// 删除属性
			deleteRow(index){
				this.form.value_list.splice(index,1)
			},
			// 增加属性
			addValue(){
				this.form.value_list.push({
					order:50,
					name:"",
					type:1,		
					status:1,
					value:"",
					edit:false
				})
			}
		},
	}
</script>

<style>
	.goods_type_item{
		cursor: pointer;
		min-width: 80px;
		text-align: center;
		line-height: 1.5;
	}
	.goods_type_item i{
		display: none;
	}
	.goods_type_item:hover{
		background: #F4F4F4;
	}
	.goods_type_item:hover font{
		display: none;
	}
	.goods_type_item:hover i{
		display: inline-block;
	}
</style>
