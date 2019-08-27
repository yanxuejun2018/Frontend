/**
 * 规则：
 * 一、例如：index/index，shop/index以index结尾的，path和name默认去除index
 * 二、例如：shop/list，默认生成name为shop_list（如果结尾为index，例如shop/index则是shop）
 * 三、填写后不会自动生成
 * **/
// 路由配置
let routes = [
	{
		path:'/',
		component:'layout', //主布局
		redirect: {name:'index'},
		children:[
			{ 
				meta: { title: "后台首页" },
				component: 'index/index',
			}, 
			{ 
				meta: { title: "商品列表" },
				component: 'shop/goods/list',
			}, 
			{
				meta: { title: "商品发布" },
				component: 'shop/goods/create',
			},
			{ 
				meta: { title: "图片列表" },
				component: 'image/list',
			},
			{ 
				meta: { title: "商品分类" },
				component: 'shop/category/list',
			},
			{ 
				meta: { title: "商品规格" },
				component: 'shop/sku/list',
			},
			{ 
				meta: { title: "商品类型" },
				component: 'shop/type/list',
			},
			{ 
				meta: { title: "增加商品类型" },
				component: 'shop/type/create',
			},
			{ 
				meta: { title: "商品评价" },
				component: 'shop/comment/list',
			},
			{ 
				meta: { title: "订单列表" },
				component: 'order/order/index',
			},
			{ 
				meta: { title: "发票管理" },
				component: 'order/invoice/index',
			},
			{ 
				meta: { title: "售后服务" },
				component: 'order/after-sale/index',
			},
			{ 
				meta: { title: "会员列表" },
				component: 'user/user-list/index',
			},
			{ 
				meta: { title: "会员等级" },
				component: 'user/user-level/index',
			},
			{ 
				meta: { title: "创建会员等级" },
				component: 'user/user-level/create',
			},
			{ 
				meta: { title: "基础设置" },
				component: 'set/base/index',
			},
			{ 
				meta: { title: "配送设置" },
				component: 'set/express/index',
			},
			{ 
				meta: { title: "管理员管理" },
				component: 'set/manager/index',
			},
			{ 
				meta: { title: "新增管理员" },
				component: 'set/manager/create-manager',
			},
			{ 
				meta: { title: "新增角色" },
				component: 'set/manager/create-group',
			},
			{ 
				meta: { title: "支付设置" },
				component: 'set/pay/index',
			},
		]
	},
	{
		meta: { title: "登录页" },
		component:'login/index',
	},
	{
		path: "*",
		redirect: {name:'index'},
	}
]
// 获取路由信息
let getRoutes = function(){
	createRoutes(routes)
	return routes;
}

// 自动生成routes
function createRoutes(arr) {
	for (let i = 0; i < arr.length; i++) {
		if (!arr[i].component) return
		// 去除index结尾
		let val = getValue(arr[i].component)
		// 生成name
		arr[i].name = arr[i].name || val.replace(/\//g,'_')
		// 生成path
		arr[i].path = arr[i].path || `/${val}`
		// 生成component
		let componentfun = import(`../../views/${arr[i].component}.vue`)
		arr[i].component = () => componentfun
		if (arr[i].children && arr[i].children.length > 0) {
			createRoutes(arr[i].children)
		}
	}
}

function getValue(str){
	let index = str.lastIndexOf('/')
	let val = str.substring(index+1,str.length)
	// 最后一个是index，去除
	if (val === 'index') {
		return str.substring(index,-1)
	}
	return str;
}

export default getRoutes()