<template>
	<!-- 
	单属性
		市场价格：  
		销售价格：  
		成本价格：  
		商品重量：  
		商品体积：-->
	<div>
		<el-form-item label="市场价格">
			<el-input placeholder="市场价格" class="w-25" type="number"
			:value="oprice" @input="vModel('oprice',$event)">
				<template slot="append">元</template>
			</el-input>
		</el-form-item>
		<el-form-item label="销售价格">
			<el-input placeholder="销售价格" class="w-25" type="number"
			:value="pprice" @input="vModel('pprice',$event)">
				<template slot="append">元</template>
			</el-input>
		</el-form-item>
		<el-form-item label="成本价格">
			<el-input placeholder="成本价格" class="w-25" type="number"
			:value="cprice" @input="vModel('cprice',$event)">
				<template slot="append">元</template>
			</el-input>
		</el-form-item>
		<el-form-item label="商品重量">
			<el-input placeholder="商品重量" class="w-25" type="number"
			:value="weight" @input="vModel('weight',$event)">
				<template slot="append">公斤</template>
			</el-input>
		</el-form-item>
		<el-form-item label="商品体积">
			<el-input placeholder="商品体积" class="w-25" type="number"
			:value="volume" @input="vModel('volume',$event)">
				<template slot="append">立方米</template>
			</el-input>
		</el-form-item>
	</div>
</template>

<script>
	import {mapState,mapMutations} from "vuex"
	export default {
		computed: {
			...mapState({
				oprice:state=>state.goodsCreate.oprice, // 市场价格
				pprice:state=>state.goodsCreate.pprice, // 销售价格
				cprice:state=>state.goodsCreate.cprice, // 成本价格
				weight:state=>state.goodsCreate.weight, // 重量
				volume:state=>state.goodsCreate.volume, // 体积
			})
		},
		methods: {
			...mapMutations([
				'vModelState'
			]),
			vModel(name,value) {
				this.vModelState({name,value})
			}
		},
	}
</script>

<style>
</style>
