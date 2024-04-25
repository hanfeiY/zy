import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入初始化样式
import '@/assets/styles/base.css'

// // 引入elementui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'



// // 引入全局组件
// import myElement from '@/components/library'.use(myElement)

import Particles from "@tsparticles/vue3";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.

createApp(App).use(Particles, {
  init: async engine => {
    // await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
    await loadSlim(engine); // or you can load the slim version from "@tsparticles/slim" if don't need Shapes or Animations
  },
});

import '@/util/axios.config'

createApp(App).
use(store).
use(router).
use(ElementPlus).
use(Particles).
mount('#app')
