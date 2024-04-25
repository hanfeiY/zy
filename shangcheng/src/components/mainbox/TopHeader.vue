<template>
    <el-header>
        <div class="left">
            <button class="iconfont icon-fenlei" @click="handleCollapsed"></button>
            <span style="margin-left:10px;">中药商店</span>
        </div>
        <div class="right">
            <span>欢迎 {{ store.state.userInfo.username }} 回来</span>
            <el-dropdown>
                <span class="el-dropdown-link iconfont icon-user">
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="handleLoOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>
<script setup>
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

const store = useStore()
const router = useRouter()
const handleCollapsed = ()=>{
    store.commit("changeCollapsed")
}

const handleCenter = ()=>{
    router.push("/center")
}

const handleLoOut = ()=>{
    localStorage.removeItem("token")
     
    store.commit("clearUserInfo")
    router.push("/login")
}
</script>

<style lang="less" scoped>
.el-header{
    background-color:@xtxColor;
    color: white;
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right{
    .iconfont{
        font-size: 30px;
        margin: auto;
        color: white;
        }
    }
}
.left,.right{
    display: flex;
}
.left{
    .iconfont{
        margin: auto;
        cursor: pointer;
    }
}
</style>