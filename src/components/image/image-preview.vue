<template>
	<el-dialog :visible="show" @close="$emit('hide',false)"
	top="3vh" lock-scroll>
		<div style="margin: -60px -20px -30px -20px;">
			<img v-show="url" :src="url" class="w-100" />
		</div>
	</el-dialog>
</template>

<script>
	export default {
		props:{
			show:Boolean,
			url:String
		}
	}
</script>

<style>
</style>
