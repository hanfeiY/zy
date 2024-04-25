<template>
    <div>
        <v-card>
            <el-page-header 
            content="用户列表"
            icon=""
            title="用户管理"
        />
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="username" label="用户名"  />
                <el-table-column  label="头像" >
                    <template #default="scope">
                        <div v-if="scope.row.avatar">
                            <el-avatar :size="50" :src="'http://localhost:3000'+scope.row.avatar">
                            </el-avatar>
                        </div>
                        <div v-else>
                            <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column  label="角色">
                    <template #default="scope">
                        
                        <el-tag type="danger" v-if="scope.row.role===1">
                            管理员
                        </el-tag>
                        <el-tag type="success" v-else>
                            用户
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                    <el-button size="small" type="info" @click="handleEdit(scope.row)">
                        编辑
                    </el-button>
                    <el-popconfirm title="你确定要删除吗？"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    @confirm="handleDelete(scope.row)">
                        <template #reference>
                        <el-button size="small" type="danger"> 
                            删除
                        </el-button>
                        </template>
                    </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </v-card>
        <el-dialog
            v-model="dialogVisible"
            title="编辑用户"
            width="500">

            <el-form
            ref="userFormRef"
            style="max-width: 600px"
            :model="userForm"
            :rules="userFormRules"
            label-width="80px"
            class="demo-ruleForm">
            <!-- 用户名 -->
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" />
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码" prop="password">
                <el-input v-model="userForm.password" 
                type="password"/>
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select
                    v-model="userForm.role"
                    placeholder="Select"
                    style="width: 100%;">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
            </el-form-item> 
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleEditConfirm()">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import {ref,onMounted,reactive} from 'vue'
import axios from 'axios'

const dialogVisible = ref(false);
const userFormRef = ref()

let userForm = reactive({
    password:"",
    username:"",
    role:2,//1 是管理员 2是用户
})
const userFormRules = reactive({
    username: [
    { required: true, message: '请输入名字', trigger: 'blur' },
  ],
    password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
    role: [
    { required: true, message: '请选择权限', trigger: 'blur' },
  ],
});
const options = [
    {
    label:"管理员",
    value:1
    },
    {
    label:"用户",
    value:2
    },

];

const tableData = ref([])
onMounted(()=>{
    getTableData()
})

const getTableData = async ()=>{
    const res = await axios.get("/adminapi/user/list")
    // console.log(res.data)
    tableData.value = res.data.data
};
//编辑回调
const handleEdit = async (data)=>{
    // console.log(data)
    const res = await axios.get(`/adminapi/user/list/${data._id}`)
    console.log(res.data.data)
    // userForm = res.data.data[0]
    Object.assign(userForm,res.data.data[0])
    dialogVisible.value = true
}
//编辑确认回调
const handleEditConfirm = ()=>{
    userFormRef.value.validate(async(valid)=>{
        if(valid){
            //1.更新后端  2.dialog隐藏 3.获取table数据
            await axios.put(`/adminapi/user/list/${userForm._id}`,
            userForm)
            dialogVisible.value = false
            getTableData()
        }
    })
}
const handleDelete =async (data)=>{
    // console.log(data)
    await axios.delete(`/adminapi/user/list/${data._id}`);
    getTableData()
} 
</script>

<style lang="less" scoped>
.el-table{
    margin-top: 50px;
}
</style>