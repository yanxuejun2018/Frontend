<template>
	<div>
		<el-button type="primary" @click="showmodel = true">选择图片</el-button>
		
		<image-choose-model :showmodel="showmodel" @hide="showmodel = false">
		</image-choose-model>
	</div>
</template>

<script>
	import imageChooseModel from "@/components/image/image-choose-model.vue"
	export default {
		components: {
			imageChooseModel
		},
		data() {
			return {
				 showmodel: false,
			}
		},
		methods: {
			
		},
	}
</script>

<style>
</style>
