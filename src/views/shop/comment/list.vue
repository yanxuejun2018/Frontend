<template>
	<div style="margin: -20px;">
		<el-card shadow="never" :body-style="{'padding':'10px 20px'}">
			
			<div slot="header" class="d-flex align-items-center" 
			style="margin-bottom: -10px;">
				<el-button type="danger" size="mini" @click="deleteAll">
					批量删除
				</el-button>
				
				<div class="ml-auto d-flex align-items-center"
				v-if="!superSearchShow">
					<el-date-picker
					  v-model="search.time"
					  type="daterange"
					  align="right"
					  unlink-panels
					  range-separator="至"
					  start-placeholder="开始日期"
					  end-placeholder="结束日期"
					  :picker-options="pickerOptions"
					  size="medium">
					</el-date-picker>
					<el-button type="info" size="mini"
					class="ml-3">搜索</el-button>
					<el-button size="mini" class="ml-3" 
					@click="superSearchShow = true">
					高级搜索</el-button>
				</div>
				
			</div>
			
			<!-- 高级搜索 -->
			<el-card class="box-card mt-2 bg-light mb-3" 
			v-show="superSearchShow"
			:body-style="{'padding':'10px'}">
				<div slot="header" class="d-flex align-items-center" 
				style="margin: -10px;">
					<span>高级搜索</span>
					<el-button class="m-0 p-0 ml-auto" type="text" 
					@click="superSearchShow = false">收起</el-button>
				</div>
				<el-form inline ref="form" :model="search" label-width="80px">
					<el-form-item label="评价用户">
						<el-input v-model="search.name" 
						placeholder="要搜索的评价用户" 
						size="mini"></el-input>
					</el-form-item>
					<el-form-item label="评价类型">
						<el-select v-model="search.type" size="mini"
						placeholder="请选择评价类型">
							<el-option label="全部" 
							value="0"></el-option>
							<el-option label="好评" 
							value="1"></el-option>
							<el-option label="中评" 
							value="2"></el-option>
							<el-option label="差评" 
							value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="发布时间">
						<el-date-picker
						  v-model="search.time"
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
					<el-form-item>
						<el-button class="ml-2" type="info" 
						size="mini">搜索</el-button>
						<el-button size="mini" 
						@click="clearForm">清空筛选条件</el-button>
					</el-form-item>
				</el-form>
			</el-card>
			
			
			<!-- 表格 -->
			<!-- 
			 商品
				商品id
				商品图片
				商品名称
			 评价信息
				评价用户
				用户评价： 好评
				用户评分： 5分
			 评价时间
				2019-07-23 14:15:17	
			 状态
				显示/隐藏
			 操作
				回复 删除
			 -->
			 <el-table border
			:data="list" default-expand-all
			style="width: 100%" ref="multipleTable"
			@selection-change="handleSelectionChange">
			<el-table-column type="selection" width="40" align="center" />
			<el-table-column type="expand">
			  <template slot-scope="props">
				
				<comment-list  :key="index" :list="props.row.list"
				v-for="(item,index) in props.row.list"
				:item="item" :index="index"
				@del="deletItem($event,props.$index)" 
				@reply="replyItem($event,props.$index)"
				@edit="editItem($event,props.$index)">
				</comment-list>


			  </template>
			</el-table-column>
			<el-table-column
			  label="ID"
			  prop="id"
			  width="80"
			  align="center">
			</el-table-column>
			<el-table-column
			  label="商品"
			  width="300">
			  <template slot-scope="props">
				  
				  <div class="media">
				  <img class="mr-3" :src="props.row.goods.cover" 
				  style="width: 50px;">
				  <div class="media-body">
					<h6 class="mt-0">{{props.row.goods.name}}</h6>
				  </div>
				</div>
				  
			  </template>
			</el-table-column>
			<el-table-column
			  label="评价信息">
			   <template slot-scope="props">
				 <div>
					 <span>用户：</span>
					 {{props.row.username}}
				 </div>
				 <div class="d-flex align-items-center">
				 	 <span>评分：</span>
					 <el-rate
					  v-model="props.row.star"
					  disabled
					  show-score
					  text-color="#ff9900"
					  disabled-void-color="#CCCCCC"
					  >
					</el-rate>
				 </div>
			  </template>
			</el-table-column>
			<el-table-column
			  label="评价时间"
			  prop="create_time"
			  width="180"
			  align="center">
			</el-table-column>
			<el-table-column
			  label="是否显示"
			  width="80"
			  align="center">
			   <template slot-scope="props">
				    <el-switch
						v-model="props.row.status"
						:active-value="1"
						:inactive-value="0">
					</el-switch>
			  </template>
			</el-table-column>
		  </el-table>
			<!-- 分页 -->
			<sum-page :current-page="currentPage"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange" />
		</el-card>
	
	</div>
</template>

<script>
	import page from '@/common/mixins/page.js';
	import commentList from "@/components/shop/comment/comment-list.vue"
	import timeSelect from "@/common/mixins/timeSelect.js"
	export default {
		mixins:[page,timeSelect],
		components: {
			commentList
		},
		data() {
			return {
				multipleSelection: [],
				list:[],
				superSearchShow:false,
				search:{
					time: '',
					name:"",
					type:'0'
				}
			}
		},
		mounted(){
			this.__init()
		},
		methods: {
			__init(){
				for (let i = 0; i < 10; i++) {
					let num = i + 1
					this.list.push({
						goods:{
							id:num,
							cover:"http://static.yoshop.xany6.com/2018071718294208f086786.jpg",
							name:"商品名称"+num
						},
						username:"用户名"+num,
						star:Math.floor(Math.random()*5),
						create_time:"2019-07-23 14:15:17",
						status:1,
						id:num,
						goods_id:num,
						user_id:10,
						avatar:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=27&gp=0.jpg",
						manager_id:0,
						reply_id:0, // 回复评论id
						comment:"评论内容",
						list:[
							{
								id:num,
								goods_id:num,
								user_id:10,
								username:"用户名"+num,
								avatar:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=27&gp=0.jpg",
								manager_id:0,
								reply_id:0,
								comment:"评论内容",
								create_time:"2019-07-23 14:15:17",
							},
							{
								id:num+2,
								goods_id:num,
								user_id:0,
								username:"客服一",
								avatar:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=27&gp=0.jpg",
								manager_id:num,
								reply_id:num,
								comment:"回复内容",
								create_time:"2019-07-23 14:15:17",
							},
							{
								id:num+1,
								goods_id:num,
								user_id:10,
								username:"用户名",
								avatar:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=27&gp=0.jpg",
								manager_id:0,
								reply_id:num,
								comment:"追加评论内容",
								create_time:"2019-07-23 14:15:17",
							},
							{
								id:num+3,
								goods_id:num,
								user_id:0,
								username:"客服一",
								avatar:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=27&gp=0.jpg",
								manager_id:num,
								reply_id:num+1,
								comment:"追加评论客服回复内容",
								create_time:"2019-07-23 14:15:17",
							}
						],
					})
				}
				console.log(this.list)
			},
			// 选中
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 删除选中
			deleteAll(){
				this.$confirm('是否删除选中？','提示',{
					type:"warning"
				}).then(()=>{
					// 找出没有选中的元素，过滤已选中
					let list = this.list.filter((v)=>{
						return !this.multipleSelection.some((item)=> item.id === v.id)
					})
					this.list = list
					// 清空chooseList
					this.multipleSelection = []
					this.$message({
						type:"success",message:"删除成功"
					})
				})
			},
			// 删除评论
			deletItem(e,index){
				console.log('删除评论')
				// 删除主评论
				if (this.list[index].id === e.item.id) {
					return this.list.splice(index,1)
				}
				// 删除追加评论
				let id = e.item.id
				e.list.splice(e.index,1)
				if (e.isappend && e.hasReply) {
					let i = e.list.findIndex((v)=>{
						return v.reply_id === id && v.manager_id
					})
					if (i > -1) {
						e.list.splice(i,1)
					}
				}
			},
			// 修改评论
			editItem(e,index){
				console.log('修改评论')
				console.log(e)
			},
			// 回复评论
			replyItem(e,index){
				console.log('回复评论')
				console.log(e)
			},
			// 清除搜索表单
			clearForm(){
				this.search = {
					time: '',
					name:"",
					type:'0'
				}
			}
		},
	}
</script>

<style>
</style>
