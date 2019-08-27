<template>
	<div>
		<!-- 首页统计 -->
		<sum-counts :counts="counts"></sum-counts>
		<div class="py-2"></div>
		<!-- 交易提示|店铺提示 -->
		<el-row :gutter="20">
			<el-col :span="12">
				<el-card class="box-card" shadow="never">
					<div slot="header" class="clearfix">
						<span>店铺及商品提示</span>
						<small class="text-secondary" style="float: right; padding: 3px 0">您需要关注的店铺信息以及待处理事项</small>
					</div>
					<div class="text item row">
						<div class="col-3">
							<a href="#" class="btn btn-light d-flex flex-column">
								<span class="h4">64</span>
								<small class="text-muted">出售中</small>
							</a>
						</div>
						<div class="col-3">
							<a href="#" class="btn btn-light d-flex flex-column">
								<span class="h4">10</span>
								<small class="text-muted">待回复</small>
							</a>
						</div>
						<div class="col-3">
							<a href="#" class="btn btn-light d-flex flex-column">
								<span class="h4">0</span>
								<small class="text-muted">库存预警</small>
							</a>
						</div>
						<div class="col-3">
							<a href="#" class="btn btn-light d-flex flex-column">
								<span class="h4">3</span>
								<small class="text-muted">仓库中</small>
							</a>
						</div>
					</div>
				</el-card>
				<el-card class="box-card mt-3" shadow="never">
					<div slot="header" class="clearfix">
						<span>交易提示</span>
						<small class="text-secondary" style="float: right; padding: 3px 0">您需要立即处理的交易订单</small>
					</div>
					<div class="text item row">
						<div class="col-2">
							<a href="#" class="btn btn-light d-flex flex-column">
								<span class="h4">0</span>
								<small class="text-muted">待付款</small>
							</a>
						</div>
						<div class="col-2">
							<a href="#" class="btn btn-light d-flex flex-column">
								<span class="h4">10</span>
								<small class="text-muted">待发货</small>
							</a>
						</div>
						<div class="col-2">
							<a href="#" class="btn btn-light d-flex flex-column">
								<span class="h4">0</span>
								<small class="text-muted">已发货</small>
							</a>
						</div>
						<div class="col-2">
							<a href="#" class="btn btn-light d-flex flex-column">
								<span class="h4">3</span>
								<small class="text-muted">已收货</small>
							</a>
						</div>
						<div class="col-2">
							<a href="#" class="btn btn-light d-flex flex-column">
								<span class="h4">3</span>
								<small class="text-muted">退款中</small>
							</a>
						</div>
						<div class="col-2">
							<a href="#" class="btn btn-light d-flex flex-column">
								<span class="h4">3</span>
								<small class="text-muted">待售后</small>
							</a>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="box-card" shadow="never">
					<div slot="header" class="clearfix">
						<span>订单总数统计</span>
						<small class="text-secondary" style="float: right; padding: 3px 0">订单数量</small>
					</div>
					<div id='myChart' style='width:100%;height:260px'></div>
				</el-card>
			</el-col>
		</el-row>
		<div class="py-2"></div>
		<!-- 销售情况统计 | 单品销售排名 -->
		<el-row :gutter="20">
			<el-col :span="12">
				<el-card class="box-card" shadow="never">
					<div slot="header" class="clearfix">
						<span>销售情况统计</span>
						<small class="text-secondary" style="float: right; padding: 3px 0" type="text">按周期统计商家店铺的订单量和订单金额</small>
					</div>
					
					<div class="card rounded-0">
						<div class="d-flex">
							<div class="bg-light text-muted d-flex justify-content-center align-items-center"
							style="width: 100px;">昨日销量</div>
							<ul class="list-group list-group-flush" style="flex: 1;">
							  <li class="list-group-item border-top-0">
								  <span class="text-muted mr-2">订单量(件) </span>
								  12
							  </li>
							  <li class="list-group-item">
								  <span class="text-muted mr-2">订单金额(元) </span>
								  12
							  </li>
							</ul>
						</div>
					</div>
					<div class="card rounded-0 mt-4">
						<div class="d-flex">
							<div class="bg-light text-muted d-flex justify-content-center align-items-center"
							style="width: 100px;">本月销量</div>
							<ul class="list-group list-group-flush" style="flex: 1;">
							  <li class="list-group-item border-top-0">
								  <span class="text-muted mr-2">订单量(件) </span>
								  12
							  </li>
							  <li class="list-group-item">
								  <span class="text-muted mr-2">订单金额(元) </span>
								  12
							  </li>
							</ul>
						</div>
					</div>
					
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="box-card" shadow="never">
					<div slot="header" class="clearfix">
						<span>单品销售排名</span>
						<small class="text-secondary" style="float: right; padding: 3px 0" type="text">按周期统计商家店铺的订单量和订单金额</small>
					</div>
					
					<el-table
					:data="tableData"
					height="220"
					border
					style="width: 100%">
					 <el-table-column
					  type="index"
					  :index="indexToNo"
					  align="center">
					</el-table-column>
					<el-table-column
					  prop="title"
					  label="商品信息">
					</el-table-column>
					<el-table-column
					  prop="num"
					  label="销量"
					  min-width="50"
					  align="center">
					</el-table-column>
				  </el-table>
					
				</el-card>
			</el-col>
		</el-row>
		
	</div>
</template>

<script>
	// 导入echarts
	import echarts from 'echarts'
	import sumCounts from "../../components/index/sum-counts.vue"
	export default {
		components: {
			sumCounts
		},
		data() {
			return {
				counts:[
					{ icon:"el-icon-user-solid",name:"关注人数(个)",value:"30",color:"bg-primary" },
					{ icon:"el-icon-s-finance",name:"订单总数(笔)",value:"120",color:"bg-success" },
					{ icon:"el-icon-s-order",name:"今日订单总金额(元)",value:"4183.80" ,color:"bg-danger"},
					{ icon:"el-icon-s-data",name:"本月销量(笔)",value:"100",color:"bg-warning" },
				],
				tableData: [{
				  title: '小天鹅（LittleSwan）滚筒洗衣机...',
				  num: '9'
				}, {
				  title: '花花公子男装裤子...',
				  num: '4'
				}, {
				  title: '三彩2019春季新款 弹力松紧腰网纱多层...',
				  num: '3'
				}, {
				  title: 'JoyFlower永生花玻璃罩礼盒鲜花速...',
				  num: '3'
				}, {
				  title: '花尚鲜花速递 同城送花33朵红玫瑰花束香...',
				  num: '2'
				}, {
				  title: '海尔 （Haier） LQ55H31 5...',
				  num: '1'
				}]
			}
		},
		mounted(){
			this.drawLine();
		},
		methods: {
			indexToNo(index){
				return index+1
			},
			drawLine(){
				// 基于准备好的dom，初始化echarts实例
				let myChart = echarts.init(document.getElementById('myChart'))
				// 绘制图表
				myChart.setOption({
					tooltip : {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					legend: {
						data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis : [
						{
							type : 'category',
							boundaryGap : false,
							data : ['周一','周二','周三','周四','周五','周六','周日']
						}
					],
					yAxis : [
						{
							type : 'value'
						}
					],
					series : [
						{
							name:'邮件营销',
							type:'line',
							stack: '总量',
							areaStyle: {},
							data:[120, 132, 101, 134, 90, 230, 210]
						},
						{
							name:'联盟广告',
							type:'line',
							stack: '总量',
							areaStyle: {},
							data:[220, 182, 191, 234, 290, 330, 310]
						},
						{
							name:'视频广告',
							type:'line',
							stack: '总量',
							areaStyle: {},
							data:[150, 232, 201, 154, 190, 330, 410]
						},
						{
							name:'直接访问',
							type:'line',
							stack: '总量',
							areaStyle: {normal: {}},
							data:[320, 332, 301, 334, 390, 330, 320]
						},
						{
							name:'搜索引擎',
							type:'line',
							stack: '总量',
							label: {
								normal: {
									show: true,
									position: 'top'
								}
							},
							areaStyle: {normal: {}},
							data:[820, 932, 901, 934, 1290, 1330, 1320]
						}
					]
				});
			}
		},
	}
</script>

<style>
</style>
