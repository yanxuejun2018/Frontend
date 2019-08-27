<template>
	<div style="margin: -20px;">
		<el-card shadow="never">
			
			<div slot="header" class="clearfix" style="margin-bottom: -10px;">
				<el-button type="success" 
				size="mini" @click="createModel = true">新增分类</el-button>
			</div>
			
			<el-dialog title="新增分类" :visible.sync="createModel">
			  <el-form :model="createForm">
				<el-form-item label="分类名称" label-width="80px">
				  <el-input v-model="createForm.name" 
				  placeholder="请输入分类名称"></el-input>
				</el-form-item>
				<el-form-item label="上级分类" label-width="80px">
				  <el-select v-model="createForm.category_id" 
				  placeholder="请选择上级分类">
				  	<el-option label="分类1" value="1"></el-option>
				  	<el-option label="分类2" value="2"></el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="分类排序" label-width="80px">
					<el-input-number v-model="createForm.order" :min="0" label="请输入排序"></el-input-number>
				</el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
				<el-button @click="createModel = false">取 消</el-button>
				<el-button type="primary" 
				@click="createModel = false">确 定</el-button>
			  </div>
			</el-dialog>
			
			
			<el-tree :data="data" node-key="id" default-expand-all 
			:expand-on-click-node="false" 
			@node-drop="handleDrop" draggable>
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<div>
						<el-input v-model="data.label" 
						v-show="data.editStatus"
						size="mini"></el-input>
						<span v-show="!data.editStatus">{{data.label}}</span>
					</div>
					<span>
						<!-- 显示隐藏 -->
						<el-button :type="data.status?'success':'danger'"
						size="mini" plain
						@click="data.status = !data.status">
						{{data.status ? '显示' : '隐藏'}}</el-button>
						<el-button size="mini" type="success"
						@click="append(data)">
							增加
						</el-button>
						<!-- 修改 -->
						<el-button size="mini" 
						:type="!data.editStatus?'warning':'default'"
						@click="data.editStatus = !data.editStatus">
							{{data.editStatus ? '完成':'修改'}}
						</el-button>
						<!-- 删除 -->
						<el-button size="mini" type="danger"
						@click="remove(node, data)">
							删除
						</el-button>
					</span>
				</span>
			</el-tree>
		</el-card>
	</div>
</template>

<script>
	let id = 1000;

	export default {
		data() {
			return {
				createModel:false,
				createForm:{
					id:0,
					name:"",
					category_id:"",
					order:0
				},
				data: [{
					id: 1,
					label: '一级 1',
					status:1,
					editStatus:false,
					children: [{
						id: 4,
						label: '二级 1-1',
						status:1,
						editStatus:false,
						children: [{
							id: 9,
							label: '三级 1-1-1',
							status:1,
							editStatus:false,
						}, {
							id: 10,
							label: '三级 1-1-2',
							status:0,
							editStatus:false,
						}]
					}]
				}, {
					id: 2,
					label: '一级 2',
					status:0,
					editStatus:false,
					children: [{
						id: 5,
						label: '二级 2-1',
						status:1,
						editStatus:false,
					}, {
						id: 6,
						label: '二级 2-2',
						status:1,
						editStatus:false,
					}]
				}, {
					id: 3,
					label: '一级 3',
					status:1,
					editStatus:false,
					children: [{
						id: 7,
						label: '二级 3-1',
						status:1,
						editStatus:false,
					}, {
						id: 8,
						label: '二级 3-2',
						status:1,
						editStatus:false,
					}]
				}]
			}
		},

		methods: {
			append(data) {
				const newChild = {
					id: id++,
					label: '新增分类'+id++,
					status:1,
					editStatus:true,
					children: []
				};
				if (!data.children) {
					this.$set(data, 'children', []);
				}
				data.children.push(newChild);
			},

			remove(node, data) {
				const parent = node.parent;
				const children = parent.data.children || parent.data;
				const index = children.findIndex(d => d.id === data.id);
				children.splice(index, 1);
			},
			
			
		  handleDrop(draggingNode, dropNode, dropType, ev) {
			//console.log('tree drop: ', dropNode.label, dropType);
			console.log(draggingNode.data);
			console.log(dropNode.data);
			console.log(dropType);
			console.log(ev);

		  },
			
		}
	};
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .el-tree-node__content{
	  height: 45px!important;
	  border-bottom: 1px solid #f4f4f4;
  }
</style>
