<template>
	<div class="table-responsive">
	<table class="table table-sm table-bordered" style="min-width: 1000px;">
		<thead>
			<tr>
				<th v-for="(th,i) in ths" :key="i" 
				:colspan="th.colspan?th.colspan:'1'"
				scope="col" :rowspan="th.rowspan" :width="th.width"
				class="text-center vertical-middle">
				{{th.name}}</th>
			</tr>
			<tr>
				<th v-for="(th,i) in getSkuTableThs" :key="i" 
				class="text-center vertical-middle">{{th.name}}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item,index) in getSkuTableData" :key="index">
				<td v-for="(c,ci) in item.skus" :key="ci"
				:rowspan="c.rowspan?c.rowspan:1" 
				class="text-center vertical-middle">
					{{c.name}}
				</td>
				<td align="center" class="text-center vertical-middle">
					<el-upload class="avatar-uploader" 
					action="https://jsonplaceholder.typicode.com/posts/" 
					:show-file-list="false"
					:on-success="handleAvatarSuccess" 
					:before-upload="beforeAvatarUpload">
						<img v-if="item.image" :src="item.image" 
						class="avatar">
						<i v-else 
						class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</td>
				<td class="text-center vertical-middle"><input type="number" class="form-control form-control-sm text-center" v-model="item.pprice" placeholder="销售价"></td>
				<td class="text-center vertical-middle"><input type="number" class="form-control form-control-sm text-center"  v-model="item.oprice" placeholder="市场价"></td>
				<td class="text-center vertical-middle"><input type="number" class="form-control form-control-sm text-center"  v-model="item.cprice" placeholder="成本价"></td>
				<td class="text-center vertical-middle"><input type="number" class="form-control form-control-sm text-center"  v-model="item.stock" placeholder="库存"></td>
				<td class="text-center vertical-middle"><input type="number" class="form-control form-control-sm text-center"  v-model="item.volume" placeholder="体积"></td>
				<td class="text-center vertical-middle"><input type="number" class="form-control form-control-sm text-center"  v-model="item.weight" placeholder="重量"></td>
				<td class="text-center vertical-middle"><input type="text" class="form-control form-control-sm text-center"  v-model="item.code" placeholder="编码"></td>
			</tr>
			
		</tbody>
	</table>
	</div>
</template>

<script>
	import {mapState,mapGetters,mapMutations} from "vuex"
	export default {
		data() {
			return {
				ths: [
					{ name:"商品规格",rowspan:1,colspan:3,width:"" },
					{ name:"sku图片",rowspan:2,width:"60" },
					{ name:"销售价",rowspan:2,width:"100" },
					{ name:"市场价",rowspan:2,width:"100" },
					{ name:"成本价",rowspan:2,width:"100" },
					{ name:"库存",rowspan:2,width:"100" },
					{ name:"体积",rowspan:2,width:"100" },
					{ name:"重量",rowspan:2,width:"100" },
					{ name:"编码",rowspan:2,width:"100" },
				],
				// extendThs:[
				// 	{ name:"颜色" },
				// 	{ name:"色调" },
				// 	{ name:"风格" },
				// ],
				data:[]
			}
		},
		computed: {
			...mapGetters([
				'getSkuTableThs',
				'getSkuTableData'
			])
		},
		watch: {
			// 监听table数据变化（跟随规格）
			getSkuTableData(newValue, oldValue) {
				this.__init(newValue)
			}
		},
		// 页面初始化
		mounted(){
			this.__init()
		},
		methods: {
			// 初始化
			__init(tableData){
				this.ths[0].colspan = this.getSkuTableThs.length
				this.data = this.getSkuTableData
			},
			// 上传头像
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
			
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}
		},
	}
</script>

<style>
	.vertical-middle{ vertical-align: middle!important; }
</style>
