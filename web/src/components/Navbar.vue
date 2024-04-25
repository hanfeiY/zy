<template>
    <div class="navbar">
        <el-menu
            :default-active="route.fullPath"
            class="el-menu-demo"
            mode="horizontal"
            :router="true">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/yaoshan">药膳</el-menu-item>
            <el-menu-item index="/product">医书</el-menu-item>
            <el-menu-item index="/yaocai">药材</el-menu-item>
            <el-menu-item index="/yaocailist">商场</el-menu-item>
            <!-- <el-menu-item index="" @click="handleClick">登录</el-menu-item> -->
        </el-menu>
        <div 
        class="iconfont icon-cart"
        style="position: fixed;
            top: 0;
            right: 180px;
            width: 40px;
            height: 59px;
            font-size:26px;
            line-height: 59px;
            text-align: center;"
            @click="handleCart()"
    >
        </div>
         <v-card class="center" ><!--:data="tableData"--> 
            <span> {{ store.state.userInfo.username }}</span>
            <el-dropdown>
                <span class="el-dropdown-link iconfont icon-user"
                style="position: fixed;
                    top: 0;
                    right: 80px;
                    width: 30px;
                    height: 59px;
                    font-size:26px;
                    line-height: 59px;
                    text-align: center;"
            >
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <!-- <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item> -->
                        <el-dropdown-item @click="handleLoOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </v-card>
        <div class="right">官网</div>
    </div>
</template>
<script setup>
import {useRoute,useRouter} from 'vue-router'
// import {ref,onMounted,reactive} from 'vue'
import {useStore} from 'vuex'
// import axios from 'axios'
const store = useStore()
const route = useRoute()
const router = useRouter()

// const handleClick = ()=>{
//     window.location = "http://localhost:8080"
// }
// const tableData = ref([])
// onMounted(()=>{
//     getTableData()
// })

// const getTableData = async ()=>{
//     const res = await axios.get(`/webapi/user/list/${data._id}`)
//     // console.log(res.data)
//     tableData.value = res.data.data
// };
const handleLoOut = ()=>{
    localStorage.removeItem("token")
     
    store.commit("clearUserInfo")
    router.push("/login")
}

const handleCart = ()=>{
    router.push('/cart')
}
</script>

<style lang="scss" scoped>
.navbar{
    position: sticky;
    top: 0px;
    z-index: 1000;
}
.right{
    position: fixed;
    top: 0;
    right: 20px;
    width: 50px;
    height: 59px;
    line-height: 59px;
    text-align: center;
}
.center{
    position: fixed;
    top: 0;
    right: 90px;
    width: 80px;
    height: 59px;
    line-height: 59px;
    text-align: center;
}
</style>