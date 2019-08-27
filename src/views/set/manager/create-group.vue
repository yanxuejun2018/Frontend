<template>
	<div style="margin: -20px;">
		<router-link :to="{name:'set_manager'}" style="position: absolute;top: 10px;left: 200px;">
			<el-button size="mini" icon="el-icon-arrow-left">回到管理组设置</el-button>
		</router-link>
		<el-card shadow="never" :body-style="{'padding':'20px 20px'}">
			<el-form ref="form" :model="form" label-width="100px">
				<el-form-item label="用户组名称">
					<el-input v-model="form.name" size="medium" class="w-50"></el-input>
				</el-form-item>
				<el-form-item label="权限分配">
					<el-tree ref="tree" :data="data" show-checkbox node-key="id" 
					default-expand-all  :default-checked-keys="form.check" 
					@check="checkChange" :props="defaultProps">
					</el-tree>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="medium" class="mt-2">
						确定</el-button>
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
					name: "",
					check:[]
				},
				data: [{
					id: 1,
					label: '管理员管理',
					children: [{
						id: 9,
						label: '增加管理员'
					}, {
						id: 10,
						label: '修改管理员'
					},{
						id: 11,
						label: '查看管理员'
					}, {
						id: 12,
						label: '删除管理员'
					}]
				}, {
					id: 2,
					label: '商品管理',
					children: [{
						id: 5,
						label: '增加商品'
					}, {
						id: 6,
						label: '修改商品'
					},{
						id: 7,
						label: '查看商品'
					}, {
						id: 8,
						label: '删除商品'
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				}
			}
		},
		methods: {
			checkChange(e) {
				this.form.check = this.$refs.tree.getCheckedKeys()
			},
		},
	}
</script>

<style>
</style>
