<template>
	<div style="margin: -20px;">
		<el-card shadow="never">
			<el-tabs v-model="tabIndex">
			  <el-tab-pane label="注册与访问">
				<el-form ref="form" :model="form" label-width="140px">
					<el-form-item label="是否允许注册会员">
						<el-radio-group v-model="form.openRegister" size="mini">
							<el-radio-button :label="1">是</el-radio-button>
							<el-radio-button :label="0">否</el-radio-button>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="注册类型">
						<el-radio-group v-model="form.registerType" size="mini">
							<el-radio-button :label="1">普通注册</el-radio-button>
							<el-radio-button :label="2">手机注册</el-radio-button>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="密码最小长度">
						<el-input class="w-25" v-model="form.passwordMinLength" 
						size="medium" type="number"></el-input>
					</el-form-item>
					<el-form-item label="强制密码复杂度">
						<el-checkbox-group v-model="form.passwordEncrypt" 
						size="mini"> 
							<el-checkbox-button :label="1" 
							name="passwordEncrypt">数字</el-checkbox-button>
							<el-checkbox-button :label="2" 
							name="passwordEncrypt">小写字母</el-checkbox-button>
							<el-checkbox-button :label="3" 
							name="passwordEncrypt">大写字母</el-checkbox-button>
							<el-checkbox-button :label="4" 
							name="passwordEncrypt">符号</el-checkbox-button>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="medium">保存</el-button>
					</el-form-item>
				</el-form>
			  </el-tab-pane>
			  <el-tab-pane label="上传设置">
			  	<el-form ref="form" :model="form" label-width="140px">
			  		<el-form-item label="默认上传方式">
			  			<el-radio-group v-model="form.upload.type" size="mini">
			  				<el-radio-button :label="index" :key="index"
							v-for="(item,index) in form.upload.list"
							>{{item.name}}</el-radio-button>
			  			</el-radio-group>
			  		</el-form-item>
			  		<template v-if="form.upload.type">
						<el-form-item label="Bucket">
							<el-input class="w-25" 
							v-model="form.upload.list[form.upload.type].bucket" 
							size="medium"></el-input>
						</el-form-item>
						<el-form-item label="ACCESS_KEY">
							<el-input class="w-50" 
							v-model="form.upload.list[form.upload.type].access_key" 
							size="medium"></el-input>
						</el-form-item>
						<el-form-item label="SECRET_KEY">
							<el-input class="w-50" 
							v-model="form.upload.list[form.upload.type].secret_key" 
							size="medium"></el-input>
						</el-form-item>
						<el-form-item label="空间域名">
							<el-input class="w-50" 
							v-model="form.upload.list[form.upload.type].host" 
							size="medium"></el-input>
							<small class="d-block text-muted">
								请补全http:// 或 https://</small>
						</el-form-item>
					</template>

			  		<el-form-item>
			  			<el-button type="primary" size="medium">保存</el-button>
			  		</el-form-item>
			  	</el-form>
			  </el-tab-pane>
			  <el-tab-pane label="Api安全">
			  	<el-form ref="form" :model="form" label-width="140px">
			  		<el-form-item label="是否开启API安全">
			  			<el-radio-group v-model="form.api.open" size="mini">
			  				<el-radio-button :label="1">是</el-radio-button>
			  				<el-radio-button :label="0">否</el-radio-button>
			  			</el-radio-group>
						<small class="d-block text-muted">api安全功能开启之后调用前端api需要传输签名串</small>
			  		</el-form-item>
			  		<el-form-item label="秘钥">
			  			<el-input class="w-50" v-model="form.api.key" 
			  			size="medium"></el-input>
						<small class="d-block text-muted">秘钥设置关系系统中api调用传输签名串的编码规则，以及会员token解析，请慎重设置，注意设置之后对应会员要求重新登录获取token</small>
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
					openRegister:0,
					registerType:1,
					passwordMinLength:5,
					passwordEncrypt:[],
					upload:{
						type:1,
						list:[
							{
								name:"本地存储"
							},
							{
								name:"七牛云存储",
								bucket:"",
								access_key:"",
								secret_key:"",
								host:""
							},
							{
								name:"阿里云存储",
								bucket:"",
								access_key:"",
								secret_key:"",
								host:""
							}
						]
					},
					api:{
						open:0,
						key:""
					}
				}
			}
		},
	}
</script>

<style>
</style>
