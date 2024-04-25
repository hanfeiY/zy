<template>
  <!-- 一级路由出口 -->
  <router-view />
</template>

<style lang="less">
@import url("./assets/styles/mixins.less");


::-webkit-scrollbar{
  width: 5px;
  height: 5px;
  position: absolute;
}

::-webkit-scrollbar-thumb{
  background: @xtxColor;
}

::-webkit-scrollbar-track{
  background: #ddd;
}
</style>
