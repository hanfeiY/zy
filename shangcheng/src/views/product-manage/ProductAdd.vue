<template>
    <div>
        <el-page-header 
            content="添加医书"
            icon=""
            title="医书管理"
        />
        <el-form
            ref="productFormRef"
            style="max-width: 600px"
            :model="productForm"
            :rules="productFormRules"
            label-width="80px"
            class="demo-ruleForm">
            <!-- 用户名 -->
            <el-form-item label="医书名称" prop="username">
                <el-input v-model="productForm.title" />
            </el-form-item>
            <!-- 密码 -->

            <el-form-item label="简要描述" prop="introduction">
                <el-input v-model="productForm.introduction" 
                    type="textarea"/>
            </el-form-item>

            <el-form-item label="详细内容" prop="detail">
                <el-input v-model="productForm.detail" 
                    type="textarea"/>
            </el-form-item>

            <el-form-item label="图片" prop="cover">

                <Upload :avatar="productForm.cover" @zhongyichange="handleChange" />

            </el-form-item>

            <el-form-item>
                <el-button type="success" @click="submitForm()" style="text-align: center;">
                    添加
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
const productFormRef = ref()
const productForm = reactive({
    title:"",
    introduction:"",
    detail:"",
    cover:"",
    file:null,
})

const productFormRules = reactive({
    title: [
    { required: true, message: '请输入名字', trigger: 'blur' },
  ],
    introduction: [
    { required: true, message: '请输入简要', trigger: 'blur' },
  ],
    detail: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
    cover: [
    { required: true, message: '请上传图片', trigger: 'blur' },
  ],
});


//每次选择完图片之后的回调
const handleChange = (file)=>{
    // console.log(file.raw)

    productForm.cover = URL.createObjectURL(file)
    productForm.file = file
};
const router = useRouter()
const submitForm = ()=>{
    productFormRef.value.validate(async(valid)=>{
        if(valid){
            //提交数据到后端
            // console.log(productForm)
            await upload("/adminapi/product/add",productForm)

            router.push(`/product-manage/productlist`)
        }
    })
}
</script>

<style lang="less" scoped>
.demo-ruleForm{
    margin-top: 50px ;
}
</style>