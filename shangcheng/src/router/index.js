import {createRouter,createWebHashHistory} from 'vue-router'
import MainBox from '@/views/MainBox.vue'
import Login from '@/views/Login.vue'
import RoutesConfig from './config'
import store from '@/store/index'
import Register from '@/views/Register.vue'

const routes = [
  {
   path:"/login",
   name:"login",
   component:Login
  },
  {
   path:"/register",
   name:"register",
   component:Register
  },
  {
   path:"/mainbox",
   name:"mainbox",
   component:MainBox
  },
  
]

const router = createRouter({
  // Hash模式
  history: createWebHashHistory(),
  routes
})

// RoutesConfig.forEach(item=>{
//   router.addRoute("mainbox",item)
// })
//每次路由跳转之前
router.beforeEach((to,from,next)=>{
  if(to.name==="login"||to.name==="register"){
    next()
  }else{
    //如果授权（已经登陆过了）next()
    //未授权，重定向到login
    if(!localStorage.getItem("token")){
      next({
        path:"/login"
      })
    }else{
     if(!store.state.isGetterRouter){
      //删除所有的嵌套路由
          router.removeRoute("mainbox")
          ConfigRouter()
          next({
          path:to.fullPath
        })
      }else{
        next()
      }
    }
  }
})

const ConfigRouter = ()=>{

  if(!router.hasRoute("mainbox")){
    router.addRoute({
      path:"/mainbox",
      name:"mainbox",
      component:MainBox
    })
  }
  RoutesConfig.forEach(item=>{
    checkPermission(item) && router.addRoute("mainbox",item)
  })

  //改变isGetterRouter = true
  store.commit("changeGetterRouter",true)
}
const checkPermission = (item)=>{
  if(item.requireAdmin){
    return store.state.userInfo.role===1
  }
  return true
}
export default router