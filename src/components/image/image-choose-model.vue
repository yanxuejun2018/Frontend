<template>
	<div>
		<el-dialog title="图片管理" :visible="showmodel" width="80%" top="3vh" lock-scroll @close="closeModel">

			<el-container class="border" style="height: 70vh;margin: -25px -20px;">
				<el-header class="border-bottom d-flex align-items-center">
					<el-select size="small" v-model="form.select" placeholder="请选择图片排序方式" class="mr-2">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
					<el-input v-model="form.keyword" size="small" style="width: 200px;" class="mr-2" placeholder="输入相册名称"></el-input>
					<el-button size="small" type="success" 
					class="mr-auto">搜索</el-button>
					  <!-- 批量删除图片 -->
					 <el-button size="small" v-show="chooseList.length > 0"
					type="danger" @click="deleteImage({all:true})">批量删除</el-button>
					<!-- 创建相册 -->
					<el-button size="small" 
					type="success" @click="showCreateModel">创建相册</el-button>
					<!-- 上传图片 -->
					<el-button size="small" type="warning"
					@click="uploadModel = true">上传图片</el-button>
				</el-header>
				<el-container>
					<el-aside width="200px" class="border-right bg-light" style="height: 52vh;overflow-y: auto;">
						<ul class="list-group list-group-flush">

							<!-- 侧边分类列表 -->
							<sum-image-nav 
							v-for="(item,index) in navList" :key="index"
							:index="index" :item="item"
							@edit="showCreateModel"
							@delect="delectImageNav"></sum-image-nav>
						</ul>
					</el-aside>
					<el-container>
						<el-main style="overflow-y: auto;height: 52vh;">
							<!-- 内容 -->

							<el-row :gutter="10">
								<el-col :span="12" :lg="4" :md="6" :sm="8" v-for="(item,index) in imageList" :key="index">

									<!-- 图片列表 -->
									<sum-image-item
									:item="item"
									:index="index"
									@choose="choose"
									@preview="preview"
									@renameImage="renameImage"
									@deleteImage="deleteImage"></sum-image-item>

								</el-col>
							</el-row>




						</el-main>
					</el-container>
				</el-container>
				<el-footer class="border-top d-flex align-items-center p-0">
					<div style="width: 200px;height: 100%;" class="border-right d-flex align-items-center justify-content-center">
						<el-button-group>
							<el-button disabled size="mini" icon="el-icon-arrow-left">
								上一页</el-button>
							<el-button size="mini">
								下一页<i class="el-icon-arrow-right el-icon--right"></i>
							</el-button>
						</el-button-group>
					</div>
					<div style="flex: 1;height: 100%;" class="d-flex align-items-center pl-2">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
						 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
						</el-pagination>
					</div>
				</el-footer>
			</el-container>

			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click="closeModel">取 消</el-button>
				<el-button size="small" type="success" @click="closeModel">选 择</el-button>
			</div>
		</el-dialog>

		<!-- 预览图片 -->
		<sum-image-preview :show="viewImage.model"
		:url="viewImage.url" @hide="viewImage.model = false">
		</sum-image-preview>

		<!-- 创建相册 -->
		<el-dialog title="创建相册" :visible.sync="createModel">
			<el-form :model="createForm">
				<el-form-item label="相册名称" label-width="80px">
					<el-input v-model="createForm.name" placeholder="请输入相册名称"></el-input>
				</el-form-item>
				<el-form-item label="相册排序" label-width="80px">
					<el-input-number v-model="createForm.order" :min="0" label="请输入排序"></el-input-number>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="createModel = false">取 消</el-button>
				<el-button type="primary" @click="createModel = false">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 上传图片 -->
		<el-dialog title="上传图片" :visible.sync="uploadModel">
			<div class="text-center">
				<el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</div>

		</el-dialog>
	</div>
</template>

<script>
	import sumImageNav from "@/components/image/image-nav.vue"
	import sumImageItem from "@/components/image/image-item.vue"
	import sumImagePreview from "@/components/image/image-preview.vue"
	export default {
		components: {
			sumImageNav,sumImageItem,sumImagePreview
		},
		props: {
			showmodel: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				viewImage: {
					model: false,
					url: ""
				},
				form: {
					select: '',
					keyword: ''
				},
				// 创建相册
				createModel: false,
				createForm: {
					name: "",
					order: 0
				},
				// 上传图片
				uploadModel: false,
				// 图片列表
				imageList: [],
				// 选中图片列表
				chooseList: [],
				// 分类列表
				navList: [],
				currentPage: 1,
			}
		},
		mounted(){
			this.getData()
		},
		methods: {
			// 模拟数据
			getData() {
				for (let i = 0; i < 20; i++) {
					let id = i + 1;
					this.imageList.push({
						id: id,
						url: 'http://show.niuteam.cn/upload/goods/20190606/98da89a0c8ac98a9cf6898a2243771d91.png',
						name: '图片名称' + id,
						ischeck: false,
						checkorder: 0,
					});
					this.navList.push({
						id: id,
						name: "分类" + id,
						num: 20,
						order:10
					});
				}
			},
			// 关闭图片管理模态框
			closeModel(e){
				this.$emit('hide',false)
			},
			// 选中图片
			choose(item){
				if (!item.ischeck) {
					// 加入chooseList
					this.chooseList.push({ id: item.id, url: item.url });
					// 增加序号
					item.checkorder = this.chooseList.length;
					// 修改imageList状态
					return item.ischeck = true;
				}
				let i = this.chooseList.findIndex((val) => val.id === item.id)
				if (i == -1) return;
				// 删除中间，重新计算序号
				let length = this.chooseList.length;
				if (i + 1 < length) {
					for (let j = i; j < length; j++) {
						let no = this.imageList.findIndex((val) => val.id === this.chooseList[j].id);
						if (no > -1) this.imageList[no].checkorder--;
					}
				}
				// 在chooseList移除
				this.chooseList.splice(i, 1);
				// 修改状态
				item.ischeck = false;
				// 重置序号
				item.checkorder = 0;
			},
			// 预览图片
			preview(url){
				this.viewImage.url = url
				this.viewImage.model = true
			},
			// 删除图片
			deleteImage(obj){
				this.$confirm(
					obj.all?'是否删除所有选中？':'是否删除该图片？',
					'提示',{
						confirmButtonText:'删除',
						cancelButtonText:'取消',
						type:'warning'
				}).then(()=>{
					// 删除单个
					if (!obj.all) {
						let {item,index} = obj;
						// 已选择，先取消选中
						if (item.ischeck) this.choose(item)
						// 删除图片
						this.imageList.splice(index,1)
					}else{	// 批量删除
						// 获取当前选中
						let list = this.imageList.filter((v)=>{
							return !this.chooseList.some((cv)=> v.id === cv.id )
						})
						this.imageList = list
						// 清空chooseList
						this.chooseList = []
					}
					this.$message({ type: 'success', message: '删除成功！' }); 
				});
			},
			// 重命名
			renameImage(item){
				this.$prompt('请输入新名称', '提示', {
				  confirmButtonText: '修改',
				  cancelButtonText: '取消',
				  inputValidator(val){
					  if (!val) return '不能为空'
				  },
				}).then(({ value }) => {
				  item.name = value
				  this.$message({
					type: 'success',
					message: '修改成功'
				  });
				})
			},
			// 显示初始化创建或修改相册
			showCreateModel(item){
				if (item) {
					this.createForm.id = item.id
					this.createForm.name = item.name
					this.createForm.order = item.order
				}
				this.createModel = true // 显示
			},
			// 关闭初始化创建或修改相册
			hideCreateModel(){
				this.createForm = { id:0, name:"", order:0 },
				this.createModel = false
			},
			// 删除分类
			delectImageNav(index){
				this.navList.splice(index,1)
				this.$message({ type:"success",message: '删除成功' })
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		},
	}
</script>

<style>
</style>
