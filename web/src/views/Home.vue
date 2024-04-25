<template>
    <div class="container">
        <el-carousel height="calc(100vh - 60px)">
            <el-carousel-item  :key="1">
                <div :style="{backgroundImage:`url(${require('@/assets/2.jpg')})`}"></div>
            </el-carousel-item>
            <el-carousel-item  :key="2">
                <div :style="{backgroundImage:`url(${require('@/assets/3.jpg')})`}"></div>
            </el-carousel-item>
            <el-carousel-item  :key="3">
                <div :style="{backgroundImage:`url(${require('@/assets/1.jpg')})`}"></div>
            </el-carousel-item>
        </el-carousel>
        <div class="center">中药网站</div>
    </div>
</template>

<style lang="scss" scoped>
.el-carousel div{
    width: 100%;
    height:100%;
    background-size: 100% 110% ;
}
.container{
    position: relative;
}
.center{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    height: 100px;
    line-height: 100px;
    font-size: 60px;
    color: #ccc;
    text-align: center;
}
</style>