<template>
    <div style="max-width: auto;background-color:#ccc">
        <el-form
            ref="userFormRef"
            style="max-width: 600px"
            :model="userForm"
            :rules="userFormRules"
            label-width="80px"
            class="demo-ruleForm">
            <!-- 用户名 -->
            <el-form-item label="用户名" prop="username" class="yonghu">
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
                    v-for="item in option1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
            </el-form-item>

            <el-form-item label="个人简介" prop="introduction">
                <el-input v-model="userForm.introduction" 
                    type="textarea"/>
            </el-form-item>

            <el-form-item label="性别" prop="gender">
                <el-select
                    v-model="userForm.gender"
                    placeholder="Select"
                    style="width: 100%;">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
            </el-form-item>

            <el-form-item label="头像" prop="avatar">

                <Upload :avatar="userForm.avatar" @zhongyichange="handleChange" />

            </el-form-item>

            <el-form-item>
                <el-button type="success" @click="submitForm()" style="text-align: center;">
                    注册完成
                </el-button>  
                <el-button type="success" @click="Return()" style="text-align: center;">
                    已有账号点击返回
                </el-button>  
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import {ref,reactive} from 'vue'
import Upload from '@/components/upload/Upload'
import upload from '@/util/upload'
import { useRouter } from 'vue-router';
// import axios from 'axios';
// import { ElMessage } from 'element-plus'

// const loginForm = reactive({
//     username:"",
//     password:""
// })

const userFormRef = ref()
const userForm = reactive({
    username:"",
    password:"",
    role:2,//1 是管理员 2是用户
    introduction:"",
    avatar:"",
    file:null,
    gender:""//保密
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
    introduction: [
    { required: true, message: '请输入介绍', trigger: 'blur' },
  ],
    gender: [
    { required: true, message: '请选择性别', trigger: 'blur' },
  ],
    avatar: [
    { required: true, message: '请上传头像', trigger: 'blur' },
  ],
});

//性别选择
const options = [
    {
        label:"保密",
        value:0
    },
    {
        label:"男",
        value:1
    },
    {
        label:"女",
        value:2
    }
];

const option1 = [
    {
        label:"用户",
        value:2
    }
]

//每次选择完图片之后的回调
const handleChange = (file)=>{
    // console.log(file.raw)

    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
};
const router = useRouter()
const submitForm = ()=>{
    userFormRef.value.validate(async(valid)=>{
        if(valid){
            //提交数据到后端
            // console.log(userForm)
            await upload("/adminapi/user/add",userForm)
            router.push(`/login`) 
        } 
    })
};
const Return = ()=>{
    router.push('/login')
}
</script>

<style lang="less" scoped>
.yonghu{
    margin-top:100px;
}
</style>