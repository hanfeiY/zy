<template>
    <div class="container">
        <div class="yaoshan-header" :style="{
            backgroundImage:`url(${require('@/assets/yaoshan-header.webp')})`
        }">
        </div>
        <div class="center">药膳</div>
        <div class="footer">为您介绍药膳的做法以及功效，让您随时了解药膳</div>
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
                <!-- <div>111</div> -->
            <div v-if="searchyaoshanlist.length">
                <div 
                    v-for="data in searchyaoshanlist" 
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
                    v-for="item in topYaoShanList" 
                    :key="item._id"
                >
                    <el-card 
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
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <el-tabs 
            style="margin: 20px;"
            v-model="whichTab" 
            class="demo-tabs" >
            <el-tab-pane 
                :key="item.name"
                v-for="item in tablist" 
                :label="item.label" 
                :name="item.name"
            >

            <el-row :gutter="20">
                <el-col :span="18" >
                    <div 
                        v-for="data in tabyaoshan[item.name]" 
                        :key="data._id" 
                        style="padding: 10px;"
                    >
                        <el-card 
                            :body-style="{padding:'0px'}" 
                            shadow="hover"
                            @click="handleChangepage(data._id)"
                        >
                            <div class="tab-image" :style="{
                                backgroundImage:`url(http://localhost:3000${data.cover})`
                            }">
                            </div>
                            <div style="padding:14px; float:left"  >
                                <span class="span">{{ data.title }}</span>
                            <div class="bottom">
                                <time class="tab-time">{{ whichTime(data.editTime) }}</time>
                            </div>
                        </div>
                    </el-card>
                </div>

                </el-col>
                <el-col :span="6">
                    <el-timeline>
                        <el-timeline-item
                            v-for="(data, index) in tabyaoshan[item.name]"
                            :key="index"
                            :timestamp="whichTime(data.editTime)"
                        >
                            {{ data.title }}
                        </el-timeline-item>
                    </el-timeline>
                </el-col>
            </el-row>
            </el-tab-pane> 
        </el-tabs>
        <el-backtop :right="100" :bottom="100" />
    </div>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue'
import {ref,onMounted, computed} from 'vue'
import {useRouter} from 'vue-router'
import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'
const whichTab = ref(1)
moment.locale("zh-cn");
const searchText = ref("")
const visible = ref(false)
const yaoshanlist = ref([])
onMounted(async()=>{
    var res= await axios.get("/webapi/yaoshan/list")
    // console.log(res.data)
    yaoshanlist.value=res.data.data
})
const searchyaoshanlist = computed(()=>
    searchText.value?yaoshanlist.value.
    filter(item=>item.title.includes(searchText.value)):[]
)

const topYaoShanList = computed(()=>yaoshanlist.value.slice(0,4))

const whichTime = time=>{
    return moment(time).format("YYYY年MM月DD日 HH:mm")
}

const tablist =[
    {
        label:"保健强身类",
        name:1
    },
    {
        label:"治疗疾病类",
        name:2
    },
    {
        label:"解表药膳",
        name:3
    },
    {
        label:"泻下药膳",
        name:4
    },
    {
        label:"清热药膳",
        name:5
    }
]

const tabyaoshan = computed(()=>_.groupBy(yaoshanlist.value,item=>item.category))

const router = useRouter()
const handleChangepage = (id)=>{

    router.push(`/yaoshan/${id}`)
}
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
.tab-image{
    width: 150px;
    height: 100px;
    background-size: 100% 100%;
    float: left;
}
.tab-time{
    font-size: 13px;
    color: #ccc;
    &:hover{
        cursor:pointer
    }
}
.span{
    &:hover{
        cursor:pointer
    }
}
</style>