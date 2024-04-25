<template>
    <div>
        <el-page-header 
            content="更改内容"
            @click="handleBack()"
            title="医书管理"
        />
        <el-form
            ref="yaocaiFormRef"
            style="max-width: 600px"
            :model="yaocaiForm"
            :rules="yaocaiFormRules"
            label-width="80px"
            class="demo-ruleForm">
            <!-- 用户名 -->
            <el-form-item label="药材名" prop="username">
                <el-input v-model="yaocaiForm.title" />
            </el-form-item>
            <!-- 密码 -->

            <el-form-item label="供应商" prop="introduction">
                <el-input v-model="yaocaiForm.introduction" />
            </el-form-item>

            <el-form-item label="数量" prop="inventory">
                <el-input v-model="yaocaiForm.inventory" />
            </el-form-item>

            <el-form-item label="价格" prop="price">
                <el-input v-model="yaocaiForm.price" />
            </el-form-item>

            <el-form-item label="详细内容" prop="detail">
                <el-input v-model="yaocaiForm.detail" 
                    type="textarea"/>
            </el-form-item>

            <el-form-item label="图片" prop="cover">

                <Upload :avatar="yaocaiForm.cover" @zhongyichange="handleChange" />

            </el-form-item>

            <el-form-item>
                <el-button type="success" @click="submitForm()" style="text-align: center;">
                    更新
                </el-button>  
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import {ref,reactive,onMounted} from 'vue'
import Upload from '@/components/upload/Upload'
import upload from '@/util/upload'
import { useRouter,useRoute } from 'vue-router';
import axios from 'axios';
const yaocaiFormRef = ref()
const route = useRoute()
const yaocaiForm = reactive({
    title:"",
    introduction:"",
    inventory:"",
    detail:"",
    cover:"",
    price:"",
    file:null,
})

const yaocaiFormRules = reactive({
    title: [
    { required: true, message: '请输入名字', trigger: 'blur' },
  ],
    introduction: [
    { required: true, message: '请输入供应商', trigger: 'blur' },
  ],
    inventory: [
    { required: true, message: '请输入数量', trigger: 'blur' },
  ],
    price: [
    { required: true, message: '请输入价格', trigger: 'blur' },
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

    yaocaiForm.cover = URL.createObjectURL(file)
    yaocaiForm.file = file
};
const router = useRouter()
const submitForm = ()=>{
    yaocaiFormRef.value.validate(async(valid)=>{
        if(valid){
            //提交数据到后端
            // console.log(yaocaiForm)
            await upload("/adminapi/yaocai/add",yaocaiForm)

            router.push(`/yaocai-manage/yaocailist`)
        }
    })
}

onMounted(()=>{
    getData()
})

const getData = async()=>{
   const res= await axios.get(`/adminapi/yaocai/list/${route.params.id}`)
//    console.log(re.data.data[0]);

   Object.assign(yaocaiForm,res.data.data[0]);
}
</script>

<style lang="less" scoped>
.demo-ruleForm{
    margin-top: 50px ;
}
</style>