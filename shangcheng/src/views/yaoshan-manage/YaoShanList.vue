<template>
    <div>
        <el-card>
            <el-page-header 
            content="药膳列表"
            icon=""
            title="药膳管理"
        />
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="title" label="标题"  />
                <el-table-column  label="类别">
                    <template #default="scope">
                        {{categoryFormat(scope.row.category)}}
                    </template>
                </el-table-column>
                <el-table-column  label="更新时间">
                    <template #default="scope">
                        {{formatTime.getTime(scope.row.editTime)}}
                    </template>
                </el-table-column>
                <el-table-column  label="是否发布">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish" 
                        :active-value="1"
                        :inactive-value="0"
                        @change="handleSwitchChange(scope.row)"/>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                    <el-button  
                    circle 
                    class="iconfont icon-yulan" 
                    type="success"
                    @click="handlePreview(scope.row)">
                    </el-button>
                    <el-button  
                    size="samll" 
                    circle 
                    class="iconfont icon-edit" 
                    @click="handleEdit(scope.row)">
                        
                    </el-button>
                    <el-popconfirm title="你确定要删除吗？"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    @confirm="handleDelete(scope.row)">
                        <template #reference>
                            <el-button  circle class="iconfont icon-delete" type="danger">
                            </el-button>
                        </template>
                    </el-popconfirm>
                    
                    
                    </template>
                </el-table-column>
            </el-table> 
        </el-card>
        <el-dialog
            v-model="dialogVisible"
            title="预览"
            width="50%">
            <div>
                <h2>{{ previewData.title }}</h2>
                <div style="font-size:12px; color:grey;">
                    {{formatTime.getTime(previewData.editTime)}}
                </div>
                <el-divider>
                    <el-icon class="iconfont icon-fengexian"></el-icon>
                </el-divider>
                <div v-html="previewData.content"
                class="htmlcontent"></div>
            </div>
        </el-dialog> 
    </div>
</template>
<script setup>
import {ref,onMounted} from 'vue'
import axios from 'axios';
import formatTime from '@/util/formatTime'
import {useRouter} from 'vue-router';
const router = useRouter()
const tableData = ref([])
const previewData = ref({})
const dialogVisible = ref(false)
onMounted(()=>{
    getTableData()
})

const getTableData = async()=>{
  const res = await axios.get(`/adminapi/yaoshan/list`)
//   console.log(res.data.data)
  tableData.value = res.data.data
}

//格式化类别信息
const categoryFormat = (category)=>{
    const arr=["保健强身类","治疗疾病类","解表药膳","泻下药膳","清热药膳"]
    return arr[category-1]
}
//开关回调
const handleSwitchChange = async (item)=>{
    // console.log(item)
    await axios.put(`/adminapi/yaoshan/publish`,{
        _id:item._id,
        isPublish:item.isPublish
    })
    await getTableData()
}

//预览回调
const handlePreview = (data)=>{
    // console.log(data)
    previewData.value=data
    dialogVisible.value = true
}
//删除回调
const handleDelete = async(item)=>{
    // console.log(item)
    await axios.delete(`/adminapi/yaoshan/list/${item._id}`)
    await getTableData()
}
//编辑回调
const handleEdit = (item)=>{
    //跳转到/yaoshan-manage/edityaoshan/:id

    router.push(`/yaoshan-manage/edityaoshan/${item._id}`)
}
</script>

<style lang="less" scoped>
.el-table{
    margin-top: 50px;
}
::v-deep .htmlcontent{
    img{
        max-width: 100%;
    }
}
</style>