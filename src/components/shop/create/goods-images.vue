<template>
	<div>
		<el-upload action="#" multiple :limit="8" 
		list-type="picture-card" :auto-upload="false" 
		:on-exceed="exceedLimit" :file-list="fileList"
		:on-change="onChange">
			<i slot="default" class="el-icon-plus"></i>
			<div slot="file" slot-scope="{file}">
				<span class="badge badge-success position-absolute rounded-0"
				style="right: 0;" v-if="coverIndex === getIndex(file)">
				封面</span>
				<img class="el-upload-list__item-thumbnail" :src="file.url">
				<span class="el-upload-list__item-actions">
					<span class="el-upload-list__item-preview" 
					@click="setCover(file)">
						<i class="el-icon-picture-outline"></i>
					</span>
					<span class="el-upload-list__item-preview" 
					@click="handlePictureCardPreview(file)">
						<i class="el-icon-zoom-in"></i>
					</span>
					<span class="el-upload-list__item-delete" 
					@click="handleRemove(file)">
						<i class="el-icon-delete"></i>
					</span>
				</span>
				
			</div>
		</el-upload>
		<el-dialog :visible.sync="dialogImageModel">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogImageUrl: '',
				dialogImageModel: false,
				fileList:[],
				coverIndex:0
			}
		},
		watch: {
			fileList(newValue, oldValue) {
				console.log(newValue)
			}
		},
		mounted(){
			
		},
		methods: {
			getIndex(file){
				return this.fileList.findIndex((v) => v===file)
			},
			handleRemove(file) {
				let index = this.getIndex(file)
				if (index > -1) {
					this.fileList.splice(index,1)
				}
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogImageModel = true;
			},
			// 上传图片超出限制
			exceedLimit(files, fileList) {
				this.$message({
					message: '最多只能上传8张',
					type: 'warning'
				});
			},
			// 监听上传
			onChange(file, fileList){
				this.fileList = fileList
			},
			// 设为封面
			setCover(file){
				let index = this.getIndex(file)
				if (index > -1) {
					this.coverIndex = index
				}
			}
		},
	}
</script>

<style>
</style>
