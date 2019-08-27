<template>
	<el-card style="cursor: pointer;"
	class="position-relative mb-3" 
	:body-style="{ padding: '0px' }" shadow="hover">
	<div class="border" :class="{'border-danger':item.ischeck}">
	  <span 
	  class="badge badge-danger position-absolute rounded-0"
		style="right: 0;top: 0;" v-show="item.ischeck">
	  {{item.checkorder}}</span>
	  <img :src="item.url" class="w-100"  style="height: 100px;"
	  @click.stop="choose(item)">
	  <div>
		<div style="margin-top: -27px;">
			<div class="d-inline-block small p-1 w-100 text-white" style="background: rgba(52, 58, 64, 0.71);">{{ item.name }}</div>
		</div>
		<div class="d-flex my-2 justify-content-center">
		  <el-button-group>
			  <el-button size="mini" class="p-2"
			  icon="el-icon-view" 
			  @click.stop="preview(item.url)"></el-button>
			  <el-button size="mini" class="p-2"
			  icon="el-icon-edit"
			  @click.stop="renameImage(item)"></el-button>
			  <el-button size="mini" class="p-2"
			  icon="el-icon-delete" 
			  @click.stop="deleteImage({item,index})"></el-button>
			</el-button-group>
		</div>
	  </div>
	</div>
	</el-card>
</template>

<script>
	export default {
		props:{
			item:Object,
			index:Number
		},
		methods: {
			// 选中
			choose(item) {
				this.$emit('choose',item)
			},
			// 预览
			preview(url){
				this.$emit('preview',url)
			},
			// 重命名
			renameImage(item){
				this.$emit('renameImage',item)
			},
			// 删除
			deleteImage(obj){
				this.$emit('deleteImage',obj)
			}
		},
	}
</script>

<style>
</style>
