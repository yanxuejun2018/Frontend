<template>
	<div style="margin: -20px;">
		<router-link :to="{name:'set_manager'}" style="position: absolute;top: 10px;left: 200px;">
			<el-button size="mini" icon="el-icon-arrow-left">回到管理员设置</el-button>
		</router-link>
		<el-card shadow="never" :body-style="{'padding':'20px 20px'}">
			<el-form ref="form" :model="form" label-width="80px">
				<!-- 
				用户名
				密码
				手机
				邮箱
				所属用户组
				描述
				 -->
				<el-form-item label="用户名">
					<el-input v-model="form.username" size="medium"
					class="w-50"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="form.password" size="medium"
					type="password" class="w-50"></el-input>
				</el-form-item>
				<el-form-item label="手机">
					<el-input v-model="form.phone" size="medium"
					type="phone" class="w-50"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="form.email" size="medium"
					type="email" class="w-50"></el-input>
				</el-form-item>
				<el-form-item label="用户组">
					<el-select v-model="form.group_id" placeholder="请选择所属用户组"
					size="medium">
						<el-option label="管理组" :value="1"></el-option>
						<el-option label="测试组" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="描述">
					<el-input v-model="form.desc" size="medium"
					type="textarea" class="w-50" :rows="3"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary"
					size="medium" class="mt-2">确定</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 用户名
				// 密码
				// 手机
				// 邮箱
				// 所属用户组
				// 描述
				form: {
					username:"",
					password:"",
					phone:"",
					email:"",
					group_id:"",
					desc:""
				}
			}
		},
	}
</script>

<style>
</style>
