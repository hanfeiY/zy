import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import YaoShan from '../views/YaoShan.vue'
import YaoShans from '../views/YaoShans.vue'
import Product from '../views/Product.vue'
import Products from '../views/Products.vue'
import YaoCai from '../views/YaoCai.vue'
import YaoCais from '../views/YaoCais.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import YaoCaiList from '../views/YaoCaiList.vue'
import Cart from '../views/Cart.vue'
import ZhiFu from '../views/ZhiFu.vue'
import MyOrderList from '../views/MyOrderList.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/yaoshan',
    name: 'yaoshan',
    component: YaoShan
  },
  {
    path: '/yaoshan/:id',
    name: 'yaoshans',
    component: YaoShans
  },
  {
    path: '/product',
    name: 'product',
    component: Product
  },
  {
    path: '/product/:id',
    name: 'products',
    component: Products
  },
  {
    path: '/yaocai',
    name: 'yaocai',
    component: YaoCai
  },
  {
    path: '/yaocai/:id',
    name: 'yaocais',
    component: YaoCais
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path:'/yaocailist',
    name:'yaocailist',
    component:YaoCaiList
  },
  {
    path:'/zhifu',
    name:'zhifu',
    component:ZhiFu
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    beforeEnter: (to, from, next) => {
      // ...
      if(!store.state.userInfo.username){
        next({
          path:"/login"
        }) 
      }else{
          next()
        }
    }
  },
  {
    path:'/orderlist',
    component:MyOrderList
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  NProgress.start();
  next()
})

router.afterEach((to,from,next)=>{
  NProgress.done();
  // next()
})

export default router
