<template>
	<div>
		
		<el-row type="flex" align="middle" justify="center" class="mt-5">
			<el-col :span="8" class="mt-5">
				<el-form ref="form" :model="form">
					<el-form-item>
						<h1 class="mb-3 text-center text-secondary">UNI-ADMIN</h1>
					</el-form-item>
					<el-form-item>
						<el-input prefix-icon="el-icon-user-solid" 
						v-model="form.username" class="mb-3"
						placeholder="请输入账号"></el-input>
					</el-form-item>
					<el-form-item>
						<el-input prefix-icon="el-icon-unlock" 
						v-model="form.password" class="mb-3"
						placeholder="请输入密码"
						type="password"></el-input>
					</el-form-item>
					<el-form-item class="mb-0">
						<el-button type="primary" @click="onSubmit" class="w-100">登录</el-button>
					</el-form-item>
				</el-form>
				
				
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					username:"",
					password:""
				}
			}
		},
		methods: {
			onSubmit(e) {
				console.log(this.form)
			}
		},
	}
</script>

<style>
</style>
