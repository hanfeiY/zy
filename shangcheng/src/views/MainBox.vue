<template>
    <el-container>
      <!-- 侧边栏 -->
      <SideMenu />
      <el-container direction="vertical">
        <!-- 头部区域 -->
        <TopHeader />
        <el-main> 
          <!-- 中间内容 -->
          <router-view />
        </el-main>
        <!-- footer区域 底部区域 -->
        <Footer />
      </el-container>
    </el-container>
</template>
<script setup>
import TopHeader from '../components/mainbox/TopHeader.vue'
import SideMenu from '../components/mainbox/Sidemenu.vue'
// import Footer from '../components/mainbox/Footer.vue'
</script>

<style lang="less" scoped>
.el-main{
  overflow:auto;
  height:calc(100vh - 60px )
}
</style>