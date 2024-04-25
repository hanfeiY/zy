<template>
    <div>
        <el-page-header 
            content="分享药膳"
            icon=""
            title="药膳管理"
        />
        <!-- style="max-width: 600px" -->
        <el-form
            ref="yaoshanFormRef"
            
            :model="yaoshanForm"
            :rules="yaoshanFormRules"
            label-width="80px"
            class="demo-ruleForm">
            
            <el-form-item label="标题" prop="title">
                <el-input v-model="yaoshanForm.title" />
            </el-form-item>

            <el-form-item label="内容" prop="content">
                <editor @event="handleChange1" />
            </el-form-item>

            <el-form-item label="类别" prop="category">
                <el-select
                    v-model="yaoshanForm.category"
                    placeholder="Select"
                    style="width: 100%;">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
            </el-form-item>
                
            <el-form-item label="封面" prop="cover">
                <Upload :avatar="yaoshanForm.cover" @zhongyichange="handleChange" />
            </el-form-item>

            <el-form-item>
                <el-button type="success" @click="submitForm()" style="text-align: center;">
                    添加药膳
                </el-button>  
            </el-form-item>
        </el-form> 
    </div>
</template>
<script setup>
import {ref,reactive} from 'vue'
import editor from '@/components/editor/Editor'
import Upload from '@/components/upload/Upload'
import upload from '@/util/upload'
import { useRouter } from 'vue-router'
const yaoshanFormRef = ref()
const router = useRouter()
const yaoshanForm = reactive({
    title:"",
    content:"",
    category:1 ,//最新动态 2典型药膳
    cover:"",
    file:null,
    isPublish:0,//0 未发布， 1 已发布
})

const yaoshanFormRules = reactive({
    title:[
        {required:true,message:"请输入标题",trigger:"blur"}
    ],
    content:[
        {required:true,message:"请输入内容",trigger:"blur"}
    ],
    category:[
        {required:true,message:"请选择分类",trigger:"blur"}
    ],
    cover:[
        {required:true,message:"请上传图片",trigger:"blur"}
    ],
})

//每次editor内容改变的回调
const handleChange1 = (data)=>{
    // console.log(data)
    yaoshanForm.content = data
}

//药膳类别
const options = [
    {
        label:"保健强身类",
        value:1
    },
    {
        label:"治疗疾病类",
        value:2
    },
    {
        label:"解表药膳",
        value:3
    },
    {
        label:"泻下药膳",
        value:4
    },
    {
        label:"清热药膳",
        value:5
    }
];

const handleChange = (file)=>{
    yaoshanForm.cover = URL.createObjectURL(file);
    yaoshanForm.file = file
}

const submitForm = ()=>{
    yaoshanFormRef.value.validate(async(valid)=>{
        if(valid){
            // console.log(yaoshanForm)
            //后台通信 
            await upload("/adminapi/yaoshan/add",yaoshanForm)
            router.push(`/yaoshan-manage/yaoshanlist`)
        }
    })
}
</script>

<style lang="less" scoped>
.demo-ruleForm{
    margin-top: 50px ;
}
</style>