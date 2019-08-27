<template>
	<div class="card" v-if="goods_type_form.length">
		<div class="card-header py-2 px-3">商品属性</div>
		<div class="card-body">
			<el-form ref="form" label-width="80px">
				<el-form-item v-for="(item,index) in goods_type_form"
				:key="index" :label="item.name">
					<!-- 输入框 -->
					<el-input v-if="item.type === 'input'" 
					:placeholder="item.name" class="w-50"
					v-model="item.value"></el-input>
					<!-- 单选框 -->
					<el-radio-group v-if="item.type === 'radio'" 
					v-model="item.value">
						<el-radio  v-for="(v,k) in item.data" :key="k"
						:label="v" border 
						size="medium"></el-radio>
					</el-radio-group>
					<!-- 复选框 -->
					<el-checkbox-group v-if="item.type === 'checkbox'" 
					v-model="item.value">
						<el-checkbox v-for="(v,k) in item.data" :key="k"
						:label="v" border size="medium"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				goods_type_form:[],
			}
		},
		mounted(){
			this.goods_type_form = [
				{ name:"输入框",type:"input",data:[],value:"" },
				{ 
					name:"单选框",
					type:"radio",
					data:["区域一"],
					value:"区域一",
				},
				{ 
					name:"多选框",
					type:"checkbox",
					data:["区域一"],
					value:["区域一"],
				}
			]
		}
	}
</script>

<style>
</style>
