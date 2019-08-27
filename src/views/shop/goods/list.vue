<template>
	<div style="margin: -20px;">
		<el-card shadow="never">
			<el-tabs v-model="tabIndex" :before-leave="beforeLeave">
			  <el-tab-pane v-for="(item,index) in tabbars" :key="index">
				<span slot="label">{{item.name}}</span>
				<div>
					<div class="d-flex align-items-center">
						<router-link :to="{name:'shop_goods_create'}">
							<el-button type="success" size="mini"
							v-show="tabIndex!=3">发布商品</el-button>
						</router-link>
						<el-button type="warning" size="mini"
						v-show="tabIndex==3">恢复商品</el-button>
						<el-button type="danger" size="mini">批量删除</el-button>
						<el-button size="mini"
						v-show="tabIndex == 1">上架</el-button>
						<el-button size="mini"
						v-show="tabIndex==0 || tabIndex==2">下架</el-button>
						<el-button size="mini"
						v-show="tabIndex==0 || tabIndex==2">推荐</el-button>
						<div class="ml-auto" v-show="!superSearchShow">
							<el-input size="mini" style="width: 150px;" 
							v-model="form.name"
							placeholder="要搜索的商品名称" class="mr-2"></el-input>
							<el-button size="mini" type="info">搜索</el-button>
							<el-button size="mini" 
							@click="superSearchShow = true">高级搜索</el-button>
						</div>
					</div>
					<!-- 高级搜索 -->
					<el-card class="box-card mt-2 bg-light" 
					v-show="superSearchShow"
					:body-style="{'padding':'10px'}">
						<div slot="header" class="d-flex align-items-center" 
						style="margin: -10px;">
							<span>高级搜索</span>
							<el-button class="m-0 p-0 ml-auto" type="text" 
							@click="superSearchShow = false">收起</el-button>
						</div>
						<el-form inline ref="form" :model="form" label-width="80px">
							<el-form-item label="商品名称">
								<el-input v-model="form.name" 
								placeholder="要搜索的商品名称" 
								size="mini"></el-input>
							</el-form-item>
							<el-form-item label="商品编码">
								<el-input v-model="form.code" 
								placeholder="要搜索的商品编码" 
								size="mini"></el-input>
							</el-form-item>
							<el-form-item label="商品类型">
								<el-select v-model="form.type" size="mini"
								placeholder="请选择商品类型">
									<el-option label="区域一" 
									value="shanghai"></el-option>
									<el-option label="区域二" 
									value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="商品分类">
								<el-input v-model="form.category" 
								placeholder="请选择商品分类" 
								size="mini"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button class="ml-2" type="info" 
								size="mini">搜索</el-button>
								<el-button size="mini" 
								@click="clearForm">清空筛选条件</el-button>
							</el-form-item>
						</el-form>
					</el-card>
					<!-- 商品列表 -->
					<!-- 
					 商品
						图片 http://static.yoshop.xany6.com/2018071718294208f086786.jpg
						名称 荣耀 V10全网通 标配版 4GB+64GB 魅丽红 
						时间	 2019-07-17 18:34:14
					 	分类  手机
					 商品类型（普通商品）	
					 实际销量（20）
					 商品排序（100）
					 商品状态（上架）
					 总库存（200）
					 价格(元)（1000.00）
					 -->
					   <el-table border class="mt-3"
						ref="multipleTable"
						:data="currentList"
						tooltip-effect="dark"
						style="width: 100%"
						@selection-change="handleSelectionChange">
						<el-table-column type="selection" width="40" align="center">
						</el-table-column>
						<!-- 商品信息 -->
						<el-table-column label="商品信息" width="400">
						  <template slot-scope="scope">
							<div class="media">
							  <img class="mr-3" :src="scope.row.titlepic"
							  width="60" height="60">
							  <div class="media-body">
								<a class="mt-0 text-primary">
								{{scope.row.title}}</a>
								<div class="mb-0 text-muted small">
									分类： {{ scope.row.category }}</div>
								<p class="text-secondary mb-0 small">
									时间： {{ scope.row.create_time }}</p>
							  </div>
							</div>
						  </template>
						</el-table-column>
						<!-- 商品类型 -->
						<el-table-column prop="type" label="商品类型" align="center">
						</el-table-column>
						<!-- 实际销量 -->
						<el-table-column prop="sale_count" label="实际销量"
						  show-overflow-tooltip align="center">
						</el-table-column>
						<!-- 商品排序 -->
						<el-table-column prop="order" label="商品排序"
						  show-overflow-tooltip align="center">
						</el-table-column>
						<!-- 商品状态 -->
						<el-table-column prop="status" label="商品状态"
						  show-overflow-tooltip align="center">
						  <template slot-scope="scope">
							  <el-button plain size="mini"
							  @click="scope.row.status = !scope.row.status"
							  :type="scope.row.status?'success':'danger'">
								  {{ scope.row.status ? '上架' : '下架' }}
							  </el-button>
						  </template>
						</el-table-column>
						<!-- 总库存 -->
						<el-table-column prop="stock" label="总库存"
						  show-overflow-tooltip align="center">
						</el-table-column>
						<!-- 价格(元) -->
						<el-table-column prop="pprice" label="价格(元)"
						  show-overflow-tooltip align="center">
						  <template slot-scope="scope">
							  <el-button class="text-danger" size="mini"
							  type="text">
							  {{scope.row.pprice}}</el-button>
						  </template>
						</el-table-column>
						<!-- 操作 -->
						 <el-table-column align="center" width="150">
						  <template slot="header" slot-scope="scope">
							操作
						  </template>
						  <template slot-scope="scope">
							  <el-button-group>
								  <el-button  size="mini" type="success" plain
								  @click="handleEdit(scope.$index, scope.row)">
								  编辑
								  </el-button>
								  <el-button type="danger" size="mini" plain
								  @click="handleDelete(scope.$index, scope.row)">
								  删除
								  </el-button>
								</el-button-group>
						  </template>
						</el-table-column>
					  </el-table>
					  <!-- 分页 -->
					  <div style="height: 50px;"></div>
					  <div class="bg-white px-3 py-2 position-fixed w-100 border-top" style="bottom: 0;z-index: 100;margin-left: -20px;">
						  <el-pagination background
							  @size-change="handleSizeChange"
							  @current-change="handleCurrentChange"
							  :current-page="currentPage"
							  :page-sizes="[100, 200, 300, 400]"
							  :page-size="100"
							  layout="total, sizes, prev, pager, next, jumper"
							  :total="400">
							</el-pagination>
					  </div>
					  
				</div>
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
				// tab切换
				tabbars:[
					{ name:"出售中",id:"saling" },
					{ name:"已下架",id:"draw" },
					{ name:"库存预警",id:"warning" },
					{ name:"回收站",id:"recycle" },
				],
				superSearchShow:false,
				form: {
					name:"",
					code:"",
					type:"",
					category:""
				},
				list:[],
				// 选中列表
				multipleSelection:[]
			}
		},
		computed: {
			// 当前分页
			currentPage(){
				return this.list[this.tabIndex].currentPage
			},
			// 当前列表
			currentList(){
				return this.list[this.tabIndex].list
			},
		},
		created(){
			this.getData()
		},
		methods:{
			getData(){
				for (let i = 0; i < this.tabbars.length; i++) {
					this.list.push({
						currentPage:1,
						list:[]
					})
				}
				for (let i = 0; i < this.list.length; i++) {
					for (let j = 0; j < 10; j++) {
						this.list[i].list.push({
						  id:j,
						  title: '荣耀 V10全网通 标配版 4GB+64GB 魅丽红'+i+'-'+j,
						  titlepic: 'http://static.yoshop.xany6.com/2018071718294208f086786.jpg',
						  create_time: '2019-07-17 18:34:14',
						  category:"手机",
						  type:"普通商品",
						  sale_count:20,
						  order:100,
						  status:1,
						  stock:200,
						  pprice:1000
						})
					}
				}
			},
			// 点击标签切换前事件
			beforeLeave(newVal,oldVal){
				// 关闭高级搜索
				this.superSearchShow = false
				// 清空表单信息
				this.clearForm()
			},
			// 清除筛选条件
			clearForm(){
				this.form = { name:"", code:"", type:"", category:"" }
			},
			// 选中
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 编辑
			handleEdit(index, row) {
				console.log(index, row);
			},
			// 删除
			handleDelete(index, row) {
				console.log(index, row);
			},
			// 每页显示
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			// 当前显示
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		}
	}
</script>

<style>
.el-form-item{
	margin-bottom: 0!important;
}
</style>
