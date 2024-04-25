<template>
    <el-aside :width="$store.state.isCollapsed?'64px':'240px'">

        <el-menu :collapse="$store.state.isCollapsed"
        :cpllapse-transition="false"
        :router="true"
        :default-active="route.fullPath">
            <el-menu-item index="/index">
                <el-icon class="iconfont icon-shouye2">
                     <!-- <icon-menu /> -->
                </el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/center">
                <el-icon class="iconfont icon-wode">
                     <!-- <icon-menu /> -->
                </el-icon>
                <span>个人中心</span>
            </el-menu-item>
            <!-- 用户相关 -->
            <el-sub-menu index="/user-manage" v-admin>
                <template #title>
                    <el-icon class="iconfont icon-yonghuguanli">
                        <!-- <location /> -->
                    </el-icon>
                    <span>用户管理</span>
                </template>
                <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
                <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
            </el-sub-menu>
            <!-- 产品相关 -->
            <el-sub-menu index="/product-manage" >
                <template #title>
                    <el-icon class="iconfont icon-book">
                        <!-- <location /> -->
                    </el-icon>
                    <span> 医书</span>
                </template>
                <el-menu-item index="/product-manage/addproduct">添加医书</el-menu-item>
                <el-menu-item index="/product-manage/productlist">医书列表</el-menu-item>
            </el-sub-menu>
            <!-- 药膳相关 -->
            <el-sub-menu index="/yaoshan-manage">
                <template #title>
                    <el-icon class="iconfont icon-weibiaoti-">
                        <!-- <location /> -->
                    </el-icon>
                    <span>药膳</span>
                </template>
                <el-menu-item index="/yaoshan-manage/addyaoshan">添加药膳</el-menu-item>
                <el-menu-item index="/yaoshan-manage/yaoshanlist">药膳列表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="/yaocai-manage">
                <template #title>
                    <el-icon class="iconfont icon-zhongyao">
                        <location />
                    </el-icon>
                    <span>药材</span>
                </template>
                <el-menu-item index="/yaocai-manage/addyaocai">添加药材</el-menu-item>
                <el-menu-item index="/yaocai-manage/yaocailist">药材列表</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<script setup>
import { useRoute } from "vue-router"
import {useStore} from 'vuex'
const route = useRoute()
// console.log(route.fullPath)
const store = useStore()
const vAdmin = {
    mounted(el){
        // console.log(el)
        if(store.state.userInfo.role!==1){
            el.parentNode.removeChild(el)
        }
    }
}
</script>


<style lang="less" scoped>
    .el-aside{
        height: auto; 
        .el-menu{
            height: auto;
        }
    }
</style>