<template>
	<div class="media pt-3" :class="isreply ? 'bg-light ml-5 px-3' : ''">
	  <img class="mr-3 rounded-circle avatar" :src="item.avatar">
	  <div class="media-body">
		  <div class="d-flex align-items-center">
			  <h6 class="my-0">{{item.username}}</h6>
			  <span class="badge badge-warning ml-2"
			  v-if="isappend">追加评论</span>
			  <span class="small text-muted ml-2">
			  	{{item.create_time}}
			  </span>
			  <div class="ml-auto">
				<el-button-group>
			  	<el-button type="primary" size="mini" v-if="!isreply && !hasReply"
				@click="$emit('reply',{item,index,list})">回复</el-button>
				<el-button type="success" size="mini" v-if="isreply"
				@click="$emit('edit',{item,index,list})">修改</el-button>
			  	<el-button type="danger" size="mini"
				@click="$emit('del',{item,index,list,isappend,hasReply})">删除</el-button>
				</el-button-group>
			  </div>
		  </div>
			<div class="text-muted my-3">{{item.comment}}</div>
	  </div>
	</div>
</template>

<script>
	export default {
		props:{
			item:[Object,Boolean],
			index:Number,
			list:Array
		},
		computed: {
			isappend() {
				return this.item.reply_id && !this.item.manager_id
			},
			isreply() {	//客服回复
				return this.item.reply_id && this.item.manager_id
			},
			hasReply(){
				return this.list.some((v)=>{
					return this.item.id === v.reply_id && v.manager_id
				})
			}
		},
	}
</script>

<style>
	.avatar{
		width: 50px;height: 50px;
	}
</style>
