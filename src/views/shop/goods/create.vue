<template>
	<div style="margin: -20px;" class="shop_goods_create">
		<router-link :to="{name:'shop_goods_list'}" style="position: absolute;top: 10px;left: 175px;">
			<el-button size="mini" icon="el-icon-arrow-left">回到商品列表</el-button>
		</router-link>
		<el-card shadow="never" :body-style="{'padding':'10px 20px'}">
			<!-- tab选项卡 -->
			<!-- 
			基础设置
			商品规格（单规格，多规格）
			商品属性（显示）
			媒体设置（轮播图片，拖拽排序，设置封面）
			商品详情（商品详情，图片模块，文字模块）
			折扣设置（限时打折）
			 -->
			<el-tabs>
				<el-tab-pane label="基础设置">
					<base-create></base-create>
				</el-tab-pane>
				<el-tab-pane label="商品规格">
					<!--
					多属性
					    拖拽排序（排序规格，规格里的属性）
						弹框选择预设
					-->
					<el-form ref="form" label-width="80px">
						<el-form-item label="商品规格">
							<el-radio-group :value="sku_type" size="medium"
							@input="vModel('sku_type',$event)">
								<el-radio-button :label="0">
									统一规格</el-radio-button>
								<el-radio-button :label="1">
									多规格</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<!-- 单属性 -->
						<template v-if="!sku_type">
							<single-attrs></single-attrs>
						</template>
						<!-- 多规格 -->
						<!-- 添加规格 -->
						<template v-else>
							<el-form-item label="添加规格">
								<!-- 新增规格列表 -->
								<sku-card v-for="(item,index) in sku_card"
								:key="index" :item="item" :index="index"
								:total="sku_card.length"
								></sku-card>
								<el-button type="success" size="mini"
								@click="addSkuCard">
									添加规格
								</el-button>
							</el-form-item>
							<!-- 批量设置：销售价 市场价 成本价 库存 体积 重量 -->
							<batch-settings></batch-settings>
							<!-- 规格详细设置 -->
							<el-form-item label="规格设置">
								<sku-table></sku-table>
							</el-form-item>
						</template>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="商品属性">
					<el-form ref="form" label-width="80px">
						<el-form-item label="商品类型">
							<el-select placeholder="请选择商品类型"
							:value="goodsType" 
							@change="vModel('goods_type_id',$event) ">
								<el-option 
								v-for="(item,index) in goods_type_options" 
								:key="index"
								:label="item.name" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
					<!-- 商品类型 -->
					<goods-type></goods-type>
				</el-tab-pane>
				<el-tab-pane label="媒体设置">
					<el-form ref="form" label-width="80px">
						<el-form-item label="商品图片">
							<goods-images></goods-images>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="商品详情">
					<div class="edit_container">
						<quill-editor v-model="content" ref="myQuillEditor" 
						:options="quillOption" @blur="onEditorBlur($event)" 
						@focus="onEditorFocus($event)"
						@change="onEditorChange($event)" 
						@ready="onEditorReady($event)">
						</quill-editor>
					</div>
				</el-tab-pane>
				<el-tab-pane label="折扣设置">
					<el-form ref="form" label-width="80px">
						<el-form-item label="会员价">
							<el-input type="number" size="medium" class="w-25"
							:value="discount" @input="vModel('discount',$event)">
								<template slot="append">%</template>
							</el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
			<div style="height: 100px;"></div>
		</el-card>

		<el-button type="success" class="position-fixed" 
		style="right: 30px;bottom: 80px;" @click="submit">保存</el-button>
		<el-button type="info" class="position-fixed" 
		style="right: 30px;bottom: 30px;">取消</el-button>

	</div>
</template>

<script>
	import baseCreate from "@/components/shop/create/base-create.vue"
	import skuTable from "@/components/shop/create/sku-table.vue"
	import skuCard from "@/components/shop/create/sku/sku-card.vue"
	import batchSettings from "@/components/shop/create/batch-settings.vue"
	import singleAttrs from "@/components/shop/create/single-attrs.vue"
	import goodsType from "@/components/shop/create/goods-type.vue"
	import goodsImages from "@/components/shop/create/goods-images.vue"
	// 引入编辑器
	import {
		quillEditor
	} from "vue-quill-editor"; //调用编辑器
	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import 'quill/dist/quill.bubble.css';
	import Quill from 'quill'
	import quillConfig from '@/common/config/quill-config.js'
	// 引入图片拖拽
	import { ImageDrop } from 'quill-image-drop-module';
	Quill.register('modules/imageDrop', ImageDrop);
	// 引入vuex 
	import { mapState,mapMutations } from "vuex"
	export default {
		components: {
			skuTable,
			baseCreate,
			skuCard,
			batchSettings,
			singleAttrs,
			quillEditor,
			goodsType,
			goodsImages
		},
		data() {
			return {
				goods_type_options:[
					{ name:'选项一',value:1 },
					{ name:'选项二',value:2 },
				],
				disabled: false,
				// 编辑器
				content: `<p></p><p><br></p><ol><li><strong><em>Or drag/paste an image here.</em></strong></li><li><strong><em>rerew</em></strong></li><li><strong><em>rtrete</em></strong></li><li><strong><em>tytrytr</em></strong></li><li><strong><em>uytu</em></strong></li></ol>`,
				quillOption: quillConfig,
			};
		},
		computed: {
			...mapState({
				sku_type:state=>state.goodsCreate.sku_type,
				sku_card:state=>state.goodsCreate.sku_card,
				goods_type_id:state=>state.goodsCreate.goods_type_id,
				discount:state=>state.goodsCreate.discount,
			}),
			editor() {
				return this.$refs.myQuillEditor.quill;
			},
			// 显示商品类型
			goodsType(){
				let name = '';
				this.goods_type_options.forEach((v)=>{
					if (v.value === this.goods_type_id) {
						return name = v.name
					}
				})
				return name;
			}
		},
		methods: {
			...mapMutations([
				'vModelState',
				'addSkuCard'
			]),
			vModel(name,value) {
				this.vModelState({name,value})
			},
			// 发布信息
			submit(){
				this.$store.commit('getSkuTableData') 
			},
			// 编辑器
			onEditorReady(editor) { // 准备编辑器

			},
			onEditorBlur() {}, // 失去焦点事件
			onEditorFocus(val, editor) {}, // 富文本获得焦点时的事件
			onEditorChange() {}, // 内容改变事件
		},
	};
</script>

<style>
.shop_goods_create .el-form-item {
	margin-bottom: 10px !important;
}
.quill-editor{
	height: 450px;
	border-bottom: 1px solid #CCCCCC;
}
</style>
