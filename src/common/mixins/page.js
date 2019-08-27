import sumPage from '@/components/common/sum-page.vue'
export default {
	components: {
		sumPage
	},
	data(){
		return {
			// 当前分页
			currentPage:1
		}
	},
	methods:{
		// 每页显示
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		// 当前显示
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		}
	}
}