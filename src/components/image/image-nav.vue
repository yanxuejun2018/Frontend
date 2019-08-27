<template>
	<div>
		<li class="list-group-item list-group-item-action d-flex align-items-center">
			{{item.name}}
			<el-dropdown class="ml-auto">
			  <span class="el-dropdown-link btn btn-light btn-sm">
				{{item.num}} 
				<i class="el-icon-arrow-down el-icon--right"></i>
			  </span>
			  <el-dropdown-menu slot="dropdown">
				<el-dropdown-item 
				@click.stop.native="edit(item)">
					修改</el-dropdown-item>
				<el-dropdown-item 
				@click.stop.native="delect(index)">
					删除</el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>
		</li>
	</div>
</template>

<script>
	export default {
		props:{
			item:Object,
			index:Number
		},
		methods: {
			edit(item) {
				this.$emit('edit',item)
			},
			delect(index){
				this.$emit('delect',index)
			}
		},
	}
</script>

<style>
</style>
