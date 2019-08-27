<template>
	<div style="margin: -20px;">
		<el-card shadow="never">
			<el-tabs v-model="tabIndex" :before-leave="beforeLeave">
			  <el-tab-pane v-for="(item,index) in tabbars" :key="index">
				<span slot="label">{{item.name}}</span>
				<div>
					<div class="d-flex align-items-center">
						<el-button type="success" size="mini">导出数据</el-button>
						<el-button type="danger" size="mini"
						@click="deleteAll">批量删除</el-button>
						
						<div class="ml-auto" v-show="!superSearchShow">
							<el-input size="mini" style="width: 150px;" 
							v-model="form.number"
							placeholder="要搜索的订单编号" class="mr-2"></el-input>
							<el-button size="mini" type="info">搜索</el-button>
							<el-button size="mini" 
							@click="superSearchShow = true">高级搜索</el-button>
						</div>
					</div>
					<!-- 高级搜索 -->
					<el-card class="box-card mt-2 bg-light" v-show="superSearchShow"
					:body-style="{'padding':'10px'}">
						<div slot="header" class="d-flex align-items-center" 
						style="margin: -10px;">
							<span>高级搜索</span>
							<el-button class="m-0 p-0 ml-auto" type="text" 
							@click="superSearchShow = false">收起</el-button>
						</div>
						
						<el-form inline ref="form" :model="form" label-width="80px">
							<el-form-item label="订单编号">
								<el-input v-model="form.number" 
								placeholder="要搜索的订单编号" 
								size="mini"></el-input>
							</el-form-item>
							<el-form-item label="订单状态">
								<el-select v-model="form.status" size="mini"
								placeholder="请选择订单状态">
									<el-option v-for="(opt,opti) in tabbars"
									:key="opti" :label="opt.name" 
									:value="opt.id"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="下单时间">
								<el-date-picker
								  v-model="form.time"
								  type="daterange"
								  align="right"
								  unlink-panels
								  range-separator="至"
								  start-placeholder="开始日期"
								  end-placeholder="结束日期"
								  :picker-options="pickerOptions"
								  size="medium">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="收货人">
								<el-input v-model="form.name" 
								placeholder="请选择收货人姓名" 
								size="mini"></el-input>
							</el-form-item>
							<el-form-item label="手机号">
								<el-input v-model="form.phone" 
								placeholder="请选择收货人手机号" 
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
					 商品信息	
					 单价/数量	
					 实付款	
					 买家	
					 支付方式	
					 配送方式	
					 交易状态	
					 操作
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
						<el-table-column label="商品信息" width="300">
						  <template slot-scope="scope">
							<div class="d-flex justify-content-between align-items-center">
								<div class="small">订单编号： 
									<span class="badge badge-light">
										{{scope.row.number}}
									</span>
								</div>
								<div class="small">下单时间： 
									<span class="badge badge-light">
										{{scope.row.create_time}}
									</span>
								</div>
							</div>
							<div class="media" 
							v-for="(goods,goodsIndex) in scope.row.order_item" 
							:key="goodsIndex">
							  <img class="mr-3" :src="goods.goods.cover"
							  width="60" height="60">
							  <div class="media-body">
								<a class="mt-0 text-primary">
								{{goods.goods.name}}</a>
							  </div>
							</div>
						  </template>
						</el-table-column>
						<!-- 实付款 -->
						<el-table-column label="实付款" align="center" width="120">
							<template slot-scope="scope">
								<div>￥{{scope.row.total_amount}}</div>
								<small class="text-muted">
									(含运费：￥0.00)
								</small>
							</template>
						</el-table-column>
						<!-- 买家 -->
						<el-table-column label="买家" align="center" width="120">
							<template slot-scope="scope">
								<div>{{scope.row.user.username}}</div>
								<small class="text-muted">
									(用户id：{{scope.row.user.user_id}})
								</small>
							</template>
						</el-table-column>
						<!-- 支付方式 -->
						<el-table-column label="商品状态" align="center">
						  <template slot-scope="scope">
							 <span class="badge badge-success" 
							 v-if="scope.row.payment_method === 'weixin'">
								 微信支付</span>
							 <span class="badge badge-primary"
							 v-if="scope.row.payment_method === 'alipay'">
								支付宝支付</span>
						  </template>
						</el-table-column>
						<!-- 配送方式 -->
						<el-table-column label="配送方式" align="center">
						  <template slot-scope="scope">
							{{scope.row.ship_status ? scope.row.ship_data : '未发货'}}
						  </template>
						</el-table-column>
						<!-- 交易状态 -->
						<el-table-column prop="pprice" label="交易状态" 
						align="center" width="150">
						  <template slot-scope="scope">
							<template v-if="!scope.row.refund_status && !scope.row.closed">
								<div>付款状态:
									<span class="badge badge-success">已付款</span>
								</div>					
								<div>发货状态:
									<span class="badge badge-secondary">待发货</span>
								</div>
								<div>收货状态:
									<span class="badge badge-secondary">待收货</span>
								</div>
							</template>
							<template v-if="scope.row.refund_status">
								<div>退货状态:
									<span class="badge badge-warning">退款中</span>
								</div>
							</template>
							<template v-if="scope.row.closed">
								<div>订单状态:
									<span class="badge badge-danger">已关闭</span>
								</div>
							</template>
						  </template>
						</el-table-column>
						<!-- 操作 -->
						 <el-table-column align="center" width="100">
						  <template slot="header" slot-scope="scope">
							操作
						  </template>
						  <template slot-scope="scope">
							  <el-button  size="mini" type="success" plain
							  @click="handleDetail(scope.$index, scope.row)">
							  订单详情
							  </el-button>
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
	import timeSelect from "@/common/mixins/timeSelect.js"
	export default {
		mixins:[timeSelect],
		data() {
			return {
				tabIndex:0,
				// tab切换
				tabbars:[
					{ name:"全部",id:"all" },
					{ name:"待付款",id:"paying" },
					{ name:"待发货",id:"sending" },
					{ name:"已发货",id:"sended" },
					{ name:"已收货",id:"geted" },
					{ name:"已完成",id:"complete" },
					{ name:"已关闭",id:"close" },
					{ name:"退款中",id:"refund" },
				],
				superSearchShow:false,
				form: {
					number:"",
					status:"",
					time:"",
					name:"",
					phone:"",
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
						  number:"2018080298545157",
						  create_time: '2019-07-17 18:34:14',
						  total_amount:10.00,
						  address:{},
						  paid_at:"2019-07-17 18:34:14",
						  payment_method:"weixin",
						  payment_no:"2018080298545157",
						  refund_status:0, //退款状态
						  refund_no:"",
						  closed:0,
						  reviewed:0,	// 是否评价
						  ship_status:1,	// 物流状态
						  ship_data:"申通快递",
						  extra:"",
						  user_id:11,
						  user:{
							 user_id:11,
							 username:"用户名" 
						  },
						  order_item:[
							  {
								  id:10,
								  order_id:j,
								  goods_id:11,
								  user_id:11,
								  goods:{
									name: '荣耀 V10全网通 标配版 4GB+64GB 魅丽红'+i+'-'+j,
									cover: 'http://static.yoshop.xany6.com/2018071718294208f086786.jpg',  
								  },
								  goods_sku_id:11,//商品skuid
								  number:1,
								  price:10,
								  star:5,
								  review:"",
								  reviewed_at:""
							  }
						  ]
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
			handleDetail(index, row) {
				console.log(index, row);
				this.$message('加急开发中...');
			},
			// 每页显示
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			// 当前显示
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			// 删除选中
			deleteAll(){
				this.$confirm('是否删除选中？','提示',{
					type:"warning"
				}).then(()=>{
					let index = this.tabIndex
					// 找出没有选中的元素，过滤已选中
					let list = this.list[index].list.filter((v)=>{
						return !this.multipleSelection.some((item)=> item.id === v.id)
					})
					this.list[index].list = list
					// 清空chooseList
					this.multipleSelection = []
					this.$message({
						type:"success",message:"删除成功"
					})
				})
			},
		}
	}
</script>

<style>
.el-form-item{
	margin-bottom: 0!important;
}
</style>
