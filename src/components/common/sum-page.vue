<template>
	<div>
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
</template>

<script>
	export default {
		props: {
			currentPage: {
				type: Number,
				default: 1
			},
		},
		methods: {
			// 每页显示
			handleSizeChange(val) {
				this.$emit('size-change',val)
			},
			// 当前显示
			handleCurrentChange(val) {
				this.$emit('current-change',val)
			}
		},
	}
</script>

<style>
</style>
