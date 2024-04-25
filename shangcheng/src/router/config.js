//首页
import Home from '../views/home/Home.vue'
//个人中心
import Center from '../views/center/Center.vue'
//用户管理
import UserAdd from '../views/user-manage/UserAdd.vue'
import UserList from '../views/user-manage/UserList.vue'
//产品管理
import ProductAdd from '../views/product-manage/ProductAdd.vue'
import ProductList from '../views/product-manage/ProductList.vue'
import ProductEdit from '../views/product-manage/ProductEdit.vue'
//药膳管理
import YaoShanAdd from '../views/yaoshan-manage/YaoShanAdd.vue'
import YaoShanList from '../views/yaoshan-manage/YaoShanList.vue'
import YaoShanEdit from '../views/yaoshan-manage/YaoShanEdit.vue'
//药材管理
import YaoCaiAdd from '../views/yaocai-manage/YaoCaiAdd.vue'
import YaoCaiList from '../views/yaocai-manage/YaoCaiList.vue'
import YaoCaiEdit from '../views/yaocai-manage/YaoCaiEdit.vue'

import NotFound from '../views/notfound/NotFound.vue'
const routes = [
//首页
    {
        path:"/index",
        component:Home
    },
//个人中心
    {
        path:"/center",
        component:Center
    },
//用户管理
    {
        path:"/user-manage/adduser",
        component:UserAdd,
        requireAdmin:true
    },
    {
        path:"/user-manage/userlist",
        component:UserList,
        requireAdmin:true
    },
//产品管理
    {
        path:"/product-manage/addproduct",
        component:ProductAdd
    },
    {
        path:"/product-manage/productlist",
        component:ProductList
    },
    {
        path:"/product-manage/editproduct/:id",
        component:ProductEdit
    },
//药膳管理
    {
        path:"/yaoshan-manage/addyaoshan",
        component:YaoShanAdd
    },
    {
        path:"/yaoshan-manage/yaoshanlist",
        component:YaoShanList
    },
    {
        path:"/yaoshan-manage/edityaoshan/:id",
        component:YaoShanEdit
    },
//药材管理
    {
        path:"/yaocai-manage/addyaocai",
        component:YaoCaiAdd
    },
    {
        path:"/yaocai-manage/yaocailist",
        component:YaoCaiList
    },
    {
        path:"/yaocai-manage/edityaocai/:id",
        component:YaoCaiEdit
    },
    {
        path:"/",
        redirect:"/index"
    },
    {
        path:"/:pathMatch(.*)*",
        name:"Notfound",
        component:NotFound
    }
]

export default routes