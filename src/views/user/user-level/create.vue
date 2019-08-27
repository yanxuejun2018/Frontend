<template>
	<div style="margin: -20px;">
		<router-link :to="{name:'user_user-level'}" style="position: absolute;top: 10px;left: 200px;">
			<el-button size="mini" icon="el-icon-arrow-left">回到等级列表</el-button>
		</router-link>
		<el-card shadow="never" :body-style="{'padding':'20px 20px'}">
			
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="等级名称">
					<el-input v-model="form.name" size="medium"
					style="width: 150px;"></el-input>
					<small class="d-block text-muted"
					style="line-height: 2.5;">设置会员等级名称</small>
				</el-form-item>
				<el-form-item label="等级权重">
					<el-input-number v-model="form.level" :min="1"
					size="medium"></el-input-number>
					<small class="d-block text-muted"
					style="line-height: 2.5;">设置会员等级排序(此参数决定等级的高低,排序越大等级越高,请谨慎选择)</small>
				</el-form-item>
				<el-form-item label="是否启用">
					<el-switch v-model="form.status" 
					:active-value="1" :inactive-value="0">
					</el-switch>
				</el-form-item>
				<el-form-item label="升级条件">
					<div class="d-flex align-items-center">
						<span class="mr-2 text-muted">累计消费满</span>
						<el-input placeholder="价格" class="w-25" type="number"
						size="medium" v-model="form.consume">
							<template slot="append">元</template>
						</el-input>
						<small class="d-block text-muted ml-2"
						style="line-height: 2.5;">
						设置会员等级所需要的累计消费必须大于等于0,单位：元</small>
					</div>
					<div class="d-flex align-items-center mb-3">
						<span class="mr-2 text-muted">累计次数满</span>
						<el-input placeholder="次数" class="w-25" type="number"
						size="medium" v-model="form.times">
							<template slot="append">笔</template>
						</el-input>
						<small class="d-block text-muted ml-2"
						style="line-height: 2.5;">
						设置会员等级所需要的购买量必须大于等于0,单位：笔</small>
					</div>
				</el-form-item>
				<el-form-item label="折扣率(%)">
					<el-input v-model="form.discont" size="medium"
					style="width: 150px;">
						<template slot="append">%</template>
					</el-input>
					<small class="d-block text-muted"
					style="line-height: 2.5;">折扣率单位为百分比，如输入90，表示该会员等级的用户可以以商品原价的90%购买</small>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="medium">确定</el-button>
					<el-button size="medium">取消</el-button>
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
					name:"普通会员",
					consume:100,
					times:10,
					discont:10,
					level:1,
					status:1,//启用
				}
			}
		},
		methods: {
			
		},
	}
</script>

<style>

</style>
