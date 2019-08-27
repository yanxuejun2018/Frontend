import Util from "@/common/util"
export default {
	state:{
		title:"商品名称", // 商品名称
		category:"", // 商品分类
		desc:"", // 描述
		unit:"", // 单位
		stock:0, // 总库存
		min_stock:0, // 库存预警
		status:1, // 是否上架  0仓库 1上架
		stock_display:1, // 库存显示 0隐藏 1显示
		express:"", //运费模板
		sku_type:0, //sku类型：0单一，1多规格
		
		oprice:0, // 市场价格
		pprice:0, // 销售价格
		cprice:0, // 成本价格
		weight:0, // 重量
		volume:0, // 体积
		// 规格卡片
		sku_card:[
			{
				name:"色调", // 规格名称
				type:0, // 规格类型 0无 1颜色 2图片
				// 规格属性列表
				list:[
					{
						name:"蓝色",
						color:"",
						image:""
					},
					{
						name:"黄色",
						color:"",
						image:""
					},
				]
			},
			{
				name:"类型", // 规格名称
				type:0, // 规格类型 0无 1颜色 2图片
				// 规格属性列表
				list:[
					{
						name:"手持",
						color:"",
						image:""
					},
					{
						name:"脚踏",
						color:"",
						image:""
					},
					{
						name:"电动",
						color:"",
						image:""
					},
				]
			}
		],
		// 规格详情设置
		sku_table:[],
		// 规格设置统一属性
		skuTableBase:{
			skus:[],
			image:"",
			pprice:0,
			oprice:0,
			cprice:0,
			stock:0,
			volume:0,
			weight:0,
			code:''
		},
		
		goods_type_id:0, // 商品类型
		
		// 图片列表
		image_list:[
			{ id:1,src:"" }
		],

		content:"",// 商品详情
		discount:0,// 折扣设置
		
	},
	getters:{
		// 获取sku表头
		getSkuTableThs(state){
			let list = []
			for (var i = 0; i < state.sku_card.length; i++) {
				if (state.sku_card[i].list.length > 0) {
					list.push({
						name:state.sku_card[i].name,
					})
				}
			}
			return list
		},
		// 获取sku_table
		getSkuTableData(state){
			if (state.sku_card.length === 0) return []
			let sku_card_list = []
			for (var i = 0; i < state.sku_card.length; i++) {
				if (state.sku_card[i].list.length > 0) {
					sku_card_list.push(state.sku_card[i].list)
				}
			}
			if (sku_card_list.length < 1) return [];
			let arr = Util.cartesianProductOf(...sku_card_list)
			return arr.map((v)=>{
				let obj = {
					skus:[],
					image:"",
					oprice:0,
					pprice:0,
					cprice:0,
					stock:0,
					volume:0,
					weight:0,
					code:""
				}
				obj.skus = v
				return obj
			})
		}
	},
	mutations:{
		// 模拟v-model
		vModelState (state, {name,value}) {
			state[name] = value
		},
		// 修改指定规格卡片
		vModelSkuCard(state, {name,index,value}) {
			state.sku_card[index][name] = value
		},
		// 删除规格卡片
		deleteSkuCard(state,index){
			state.sku_card.splice(index,1)
		},
		// 增加规格卡片
		addSkuCard(state){
			state.sku_card.push({
				name:"名称",
				type:0,
				list:[]
			})
		},
		// 规格卡片排序
		sortSkuCard(state,{action,index}){
			Util[action](state.sku_card,index)
		}
	},
	actions:{
		
	}
}