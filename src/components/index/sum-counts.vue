<template>
	<div>
		<el-row :gutter="20">
			
			<el-col :span="6" v-for="(item,index) in counts" :key="index">
				<el-card class="box-card d-flex" shadow="hover">
					<div class="d-flex align-items-center">
						<i class="h3 mb-0 mr-3 p-2 text-light"
						:class="`${item.icon} ${item.color}`"></i>
						<div>
							<div class="text item h4">{{item.value}}</div>
							<div class="text item text-muted small">{{item.name}}</div>
						</div>
					</div>
				</el-card>
			</el-col>
			
		</el-row>
	</div>
</template>

<script>
	export default {
		props: {
			counts: {
				type: Array,
				default: []
			},
		},
	}
</script>

<style>
</style>
