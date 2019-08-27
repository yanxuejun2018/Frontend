<template>
	<div class="border px-3 py-1 position-relative d-flex align-items-center mr-3 rounded mb-2" style="cursor: move;">
		<!-- 颜色 -->
		<el-color-picker class="mr-2" v-if="type===1" 
		:value="item.color" @change="colorChange"></el-color-picker>
		<!-- 图片 -->
		<el-upload class="avatar-uploader mr-2" v-else-if="type===2"
		action="https://jsonplaceholder.typicode.com/posts/" 
		:show-file-list="false"
		:on-success="handleAvatarSuccess" 
		:before-upload="beforeAvatarUpload">
			<img v-if="item.image" :src="item.image" 
			class="avatar">
			<i v-else 
			class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
		<!-- 可输入框 -->
		<input type="text" :value="item.name" @input="nameChange"
		class="form-control text-center form-control-sm border-0" 
		style="width: 70px;">
		<i class="btn btn-sm btn-light p-0 position-absolute sku-item-close el-icon-circle-close" style="line-height: 1;" 
		@click="deleteItem"></i>
	</div>
</template>

<script>
	export default {
		props: {
			item:Object,
			index:Number,
			type:Number
		},
		methods: {
			// 上传头像
			handleAvatarSuccess(res, file) {
				this.$emit('update-image',{
					index:this.index,
					value:URL.createObjectURL(file.raw)
				})
			},
			// 验证
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
			},
			deleteItem(){
				this.$emit('deleteItem',this.index)
			},
			colorChange(e){
				if (e) this.$emit('update-color',{
					index:this.index,
					value:e
				})
			},
			nameChange(e){
				this.$emit('input', {
					index:this.index,
					value:e.target.value
				})
			}
		},
	}
</script>

<style>
	.sku-item-img{
		height: 30px;line-height: 30px;width: 30px;cursor: pointer;
	}
	.sku-item-img img{
		width: 16px;height: 16px;
	}
	.sku-item-close{
		top:-8px;right:-8px;line-height: 0;
	}
	.avatar-uploader-icon {
		font-size: 15px;
		width: 30px;
		height: 30px;
		line-height: 30px;
	}
	
	.avatar {
		width: 30px;
		height: 30px;
	}
</style>
