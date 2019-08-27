<template>
	<div class="card rounded-0 mb-2">
		<div class="card-header bg-light py-1 d-flex align-items-center">
			<small class="text-muted">规格项：</small>
			<el-input placeholder="请输入规格名称" size="mini" class="w-25"
			:value="item.name" @input="ChangeSkuCard('name',index,$event)">
				<el-button slot="append" icon="el-icon-more"></el-button>
			</el-input>
			<el-radio-group class="ml-3" :value="item.type"
			@input="ChangeSkuCard('type',index,$event)">
				<el-radio :label="0" class="mb-0 mr-2">无</el-radio>
				<el-radio :label="1" class="mb-0 mr-2">颜色</el-radio>
				<el-radio :label="2" class="mb-0 mr-2">图片</el-radio>
			</el-radio-group>
			<div class="ml-auto d-flex">
				<el-button size="mini" class="px-2" 
				:disabled="index === 0" 
				@click="toSort('moveUp',index)"
				icon="el-icon-top"></el-button>
				<el-button size="mini" class="px-2" 
				:disabled="total === (index + 1)" 
				@click="toSort('moveDown',index)"
				icon="el-icon-bottom"></el-button>
				<el-button type="text" size="mini"
				@click="deleteCard">删除</el-button>
			</div>
		</div>
		<div class="card-body py-1">
			<div class="d-flex align-items-center flex-wrap my-2"
			v-if="item.list.length">
				
				<!-- 规格列表 -->
				<sku-children-item v-for="(v,i) in list" :key="i"
				:item="v" :index="i" :type="item.type" 
				 @update-image="updateImage" @update-color="updateColor"
				 @deleteItem="deleteChildItem" @input="skuChildrenItemChange"
				v-dragging="{ item: v, list: list, group: `skuItem${index}` }"
				></sku-children-item>
			</div>
			<div>
				<el-button type="text" size="mini" icon="el-icon-plus"
				@click="addChildItem">
					增加规格值
				</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import skuChildrenItem from "@/components/shop/create/sku/sku-children-item.vue"
	import { mapState,mapMutations } from "vuex"
	export default {
		props: {
			item: Object,
			index:Number,
			total:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				list: []
			}
		},
		components: {
			skuChildrenItem,
		},
		mounted () {
			// 初始化list
			this.__init(this.item)
			// 监听拖拽
			this.$dragging.$on('dragged', ({ value }) => {
			  // console.log(value.item)
			  // console.log(value.list)
			  // console.log(value.otherData)
			})
			// 拖拽结束
			this.$dragging.$on('dragend', (e) => {
				// 修改vuex对应的列表值
				this.updateList()
			})
		},
		watch: {
			item(newValue, oldValue) {
				this.__init(newValue)
			}
		},
		methods: {
			...mapMutations([
				'vModelSkuCard',
				'deleteSkuCard',
				'sortSkuCard'
			]),
			// 更新对应vuex属性列表
			updateList(){
				this.vModelSkuCard({
					name:'list',
					index:this.index,
					value:this.list
				})
			},
			// 修改指定规格卡片的属性类型
			ChangeSkuCard(name,index,value){
				this.vModelSkuCard({name,index,value})
			},
			// 初始化数据
			__init(item){
				this.list = item.list.map((v)=> v)
			},
			// 删除属性
			deleteChildItem(index) {
				this.list.splice(index,1)
				this.updateList()
			},
			// 增加属性
			addChildItem(){
				this.list.push({
					name:"规格名称",
					color:"",
					image:""
				})
				this.updateList()
			},
			// 更新图片
			updateImage(e){
				this.list[e.index].image = e.value
				this.updateList()
			},
			// 更新颜色
			updateColor(e){
				this.list[e.index].color = e.value
				this.updateList()
			},
			// 删除当前卡片
			deleteCard(){
				this.deleteSkuCard(this.index)
			},
			// 排序
			toSort(action,index){
				this.sortSkuCard({action,index})
			},
			// 监听规格属性变化
			skuChildrenItemChange(e){
				this.list[e.index].name = e.value
				this.updateList()
			}
		},
	}
</script>

<style>
</style>
