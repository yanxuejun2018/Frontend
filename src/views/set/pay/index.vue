<template>
	<div style="margin: -20px;">
		<el-card shadow="never">
			<el-tabs v-model="tabIndex">
			  <el-tab-pane label="支付设置">
			  	<el-table border
			  	:data="paymants"
			  	tooltip-effect="dark"
			  	style="width: 100%"
			  	>
			  	 <!-- 支付方式 -->
			  	<el-table-column prop="name" label="支付方式" align="left">
				  <template slot-scope="scope">
					  <div class="media">
						  <img :src="scope.row.src" 
						  class="mr-3 align-self-center rounded"
						  style="width: 40px;height: 40px;">
						  <div class="media-body">
							  <h6 class="mb-1">{{scope.row.name}}</h6>
							  <small class="text-muted">{{scope.row.desc}}</small>
						  </div>
					  </div>
				  </template>
				</el-table-column>
			  	<!-- 操作 -->
			  	<el-table-column align="center" width="250" label="操作">
			  	  <template slot-scope="scope">
			  		  <el-button type="text">配置</el-button>
			  	  </template>
			  	</el-table-column>
			  	</el-table>
			  </el-tab-pane>
			  <el-tab-pane label="购物设置">
				  <el-form ref="form" :model="form" label-width="140px">
				  	<el-form-item label="未支付订单">
				  		<el-input class="w-25" 
				  		size="medium" type="number">
							<template slot="append">
								天后自动关闭
							</template>
						</el-input>
						<small class="d-block text-muted">
							订单下单未付款，n天后自动关闭，设置0天不自动关闭
						</small>
				  	</el-form-item>
					<el-form-item label="已发货订单">
						<el-input class="w-25" 
						size="medium" type="number">
							<template slot="append">
								天后自动确认收货
							</template>
						</el-input>
						<small class="d-block text-muted">
							如果在期间未确认收货，系统自动完成收货，设置0天不自动收货
						</small>
					</el-form-item>
					<el-form-item label="已完成订单">
						<el-input class="w-25" 
						size="medium" type="number">
							<template slot="append">
								天内允许申请售后
							</template>
						</el-input>
						<small class="d-block text-muted">
							订单完成后 ，用户在n天内可以发起售后申请，设置0天不允许申请售后
						</small>
					</el-form-item>
					<el-form-item label="运费组合策略">
						<el-select placeholder="请选择运费组合策略">
							<el-option label="叠加" value="0"></el-option>
							<el-option label="以最低运费结算" value="1"></el-option>
							<el-option label="以最高运费结算" value="2"></el-option>
						</el-select>
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
				paymants:[
					{
						name:"银联卡支付",
						desc:"该系统支持即时到账接口",
						src:"http://wxcs.niuteam.cn/addons/NsUnionPay/ico.png"
					},
					{
						name:"支付宝支付",
						desc:"该系统支持即时到账接口",
						src:"http://wxcs.niuteam.cn/addons/NsAlipay/ico.png"
					},
					{
						name:"微信支付",
						desc:"该系统支持微信网页支付和扫码支付",
						src:"http://wxcs.niuteam.cn/addons/NsWeixinpay/ico.png"
					}
				]
			}
		},
	}
</script>

<style>
</style>
