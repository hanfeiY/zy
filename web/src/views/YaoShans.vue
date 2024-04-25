<template>
    <el-row>
        <el-col :span="17" :offset="1">
            <div>
                <h2>{{ currentYaoShan.title }}</h2>

                <div class="time">
                    <h4>{{ whichTime(currentYaoShan.editTime) }}</h4>
                </div>

                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>
                <div v-html="currentYaoShan.content"></div>
                
            </div>
        </el-col>
        <el-col :span="4" :offset="1" :pull="1">
             <el-card style="max-width: 480px">
                <template #header>
                    <div class="card-header">
                        <span style="font-size:16px;font-weight:bold">最新发布药膳</span>
                    </div>
                </template>
                    <div 
                        v-for="item in topYaoShan" 
                        :key="item._id" 
                        class="text item"
                        style="padding: 14px;"
                        @click="handleChange(item._id)"
                    >
                    <span class="span">{{ item.title }}</span>
                        <div class="bottom">
                            <time class="tab-time">{{ whichTime(item.editTime) }}</time>
                        </div>
                    </div>
                <!-- <template #footer>Footer content</template> -->
            </el-card>       
        </el-col>
    </el-row>
</template>

<script setup>
import { onMounted,ref,watchEffect } from 'vue'; 
import axios from 'axios';
import { useRoute ,useRouter} from 'vue-router';
import moment from 'moment'
import { StarFilled } from '@element-plus/icons-vue'
moment.locale("zh-cn");
const route = useRoute()
const router = useRouter()

const currentYaoShan = ref({})
const topYaoShan = ref([])
watchEffect(async()=>{
    const res1 = await axios.get(`/webapi/yaoshan/list/${route.params.id}`)
    const res2 = await axios.get(`/webapi/yaoshan/toplist?limit=4`)
    currentYaoShan.value = res1.data.data[0]
    topYaoShan.value= res2.data.data
})

const whichTime = time=>{
    return moment(time).format("YYYY年MM月DD日 HH:mm")
}

const handleChange = (id)=>{
    router.push(`/yaoshan/${id}`)
}
</script>

<style lang="scss" scoped>
.el-row{
    margin-top: 35px;
}
.time{
    margin-top: 5px;
    font-size:13px;
    color: #ccc;
}
.tab-time{
    margin-top: 5px;
    font-size:13px;
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