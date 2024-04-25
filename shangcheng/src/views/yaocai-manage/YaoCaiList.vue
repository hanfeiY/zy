<template>
    <div>
        <el-card>
            <el-page-header 
            content="药材列表"
            icon=""
            title="药材管理"
        />
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="title" label="药材名"  />

                <el-table-column prop="introduction" label="供应商"  />

                <el-table-column prop="inventory" label="库存"  />

                <el-table-column  label="更新时间">
                    <template #default="scope">
                        {{formatTime.getTime(scope.row.editTime)}}
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                   
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
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import axios from 'axios';
import formatTime from '@/util/formatTime'
import {useRouter} from 'vue-router';

const router = useRouter()
const tableData = ref([])
onMounted(()=>{
    getTableData()
})

const getTableData = async()=>{
  const res = await axios.get(`/adminapi/yaocai/list`)
//   console.log(res.data.data)
  tableData.value = res.data.data
}

//删除回调
const handleDelete = async(item)=>{
    // console.log(item)
    await axios.delete(`/adminapi/yaocai/list/${item._id}`)
    await getTableData()
}
//编辑回调
const handleEdit = (item)=>{
    //跳转到/yaoshan-manage/edityaoshan/:id

    router.push(`/yaocai-manage/edityaocai/${item._id}`)
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