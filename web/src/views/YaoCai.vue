<template>
    <div class="container">
        <div class="yaoshan-header" :style="{
            backgroundImage:`url(${require('@/assets/yaoshan-header.webp')})`
        }">
        </div>
        <div class="center">药书</div>
        <div class="footer">为您介绍药书的内容，让您随时了解并学习</div>
        <div class="search">
            <el-popover
                placement="bottom"
                title="搜索结果"
                width="50%"
                :visible="visible">
                <template #reference>
                    <el-input
                        v-model="searchText"
                        class="w-50 m-2"
                        placeholder="请输入关键字"
                        :prefix-icon="Search"
                        type="search"
                        size="large"
                        @input="visible=true"
                        @blur="visible=false"/>
                </template>
                <div v-if="searchyaocailist.length">
                    <div 
                        v-for="data in searchyaocailist" 
                        :key="data._id"
                        class="search-item"
                        @click="handleChangepage(data._id)"
                    >
                        {{ data.title }}
                    </div>
                </div>
                <div v-else>
                    <el-empty description="暂无内容" :image-size="50"></el-empty>
                </div>
            </el-popover>
        </div>
        <div class="topyaoshan">
            <el-row :gutter="20">
                <el-col 
                    :span="6" 
                    v-for="item in topYaoCaiList" 
                    :key="item._id"
                >
                    <el-card 
                        style="margin-top: 20px;"
                        :body-style="{padding:'0px'}" 
                        shadow="hover"
                        @click="handleChangepage(item._id)"
                    >
                        <div style="padding:14px">
                            <span>{{ item.title }}</span>
                            <div class="bottom">
                                <time class="time">{{ whichTime(item.editTime) }}</time>
                            </div>
                        </div>
                        <div class="image" :style="{
                            backgroundImage:`url(http://localhost:3000${item.cover})`
                        }">

                        </div>
                            <!-- ￥{{ item.price }} -->
                     
                    </el-card>
                    <!-- <el-input-number v-model="count" @change="countChange"> 
                        
                    </el-input-number> -->
                        <!-- <div style="text-align:center;">
                            <el-button style="text-align:center;width:150px;" round>
                                加入购物车
                            </el-button>
                        </div> -->
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import {ref,onMounted, computed} from 'vue'
import axios from 'axios';
import {useRouter} from 'vue-router'
import moment from 'moment'
// import { useCartStore } from '@/store/cartStore';

// const cartStore = useCartStore()
const searchText = ref("")
const visible = ref(false)
const yaocailist = ref([])

onMounted(async()=>{
   var res = await axios.get("/webapi/yaocai/list")
//    console.log(res.data)
    yaocailist.value=res.data.data
})

const searchyaocailist = computed(()=>searchText.value?yaocailist.value.filter(item=>item.
title.includes(searchText.value)):[])

const topYaoCaiList = computed(()=>yaocailist.value.slice())

const whichTime = time=>{
    return moment(time).format("YYYY年MM月DD日 HH:mm")
}

const router = useRouter()
const handleChangepage = (id)=>{

    router.push(`/yaocai/${id}`)
}

// //count
// const count = ref(1)
// const countChange = (count)=>{
//     console.log(count);
// }
// //添加购物车
// const addCart = ()=>{
//     cartStore.addCart({
//         id:yaocailist.value.id,
//         name:yaocailist.value.title,
//         picture:yaocailist.value.cover,
//         price:yaocailist.value.price,
//         count:count.value,
//         selected:true
//     })
// }
</script>

<style lang="scss" scoped>
.container{
    position: relative;
}
.yaoshan-header{
    width: 100%;
    height: 400px;
    background-size: cover ;
}
.search{
    position: absolute;
    top: 300px;
    width: 100%;
    text-align: center;
    .el-input{
        width: 50%;
    }
}
.center{
    position: absolute;
    left: 50%;
    top: 100px;
    transform: translate(-50%,-50%);
    height: 100px;
    line-height: 100px;
    font-size: 60px;
    color: #ccc;
    text-align: center;
}
.footer{
    position: absolute;
    left: 50%;
    top: 170px;
    transform: translate(-50%,-50%);
    height: 100px;
    line-height: 100px;
    font-size: 30px;
    color: #ccc;
    text-align: center;
}
.search-item{
    height: 50px;
    line-height: 50px;
    &:hover{
        background: whitesmoke;
        color: green;
        cursor:pointer
    }
}
.topyaoshan{
    margin: 20px;
    .image{
        width: 100%;
        height: 150px;
        background-size: 100% 100% ;
    }
    .time{
        font-size: 13px;
        color: #ccc;
    }
}
</style>