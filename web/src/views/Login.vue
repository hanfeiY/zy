<template>
    <div>
        <vue-particles
            id="tsparticles"
            :particlesLoaded="particlesLoaded"
            :options="option"
        />

        <div class="formContainer">
            <h3>中药商店</h3>
            <el-form
                ref="loginFormRef"
                :model="loginForm"
                status-icon
                :rules="loginRules"
                label-width="80px"
                class="demo-ruleForm"
            >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" type="username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                    <el-button type="success" @click="submitForm()">
                        登录
                    </el-button>
                    <el-button type="success" @click="handletiaozhuan()">
                        注册账号
                    </el-button>
                
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup>
import {reactive,ref} from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'
import { ElMessage } from 'element-plus'
import {useStore} from 'vuex'
const store = useStore()
const loginForm = reactive({
    username:"",
    password:""
})//表单绑定的响应式对象
const loginFormRef = ref()//表单的引用对象
const loginRules = reactive({
    username:[
        {
            required:true,message:"请输入用户名",trigger:"blur"
        }
    ],
    password:[
        {
            required:true,message:"请输入密码",trigger:"blur"
        }
    ],
})
const handletiaozhuan = ()=>{
    router.push('/register')
}
const router = useRouter()
//提交表单函数
const submitForm =()=>{
    //1.校验表单
    loginFormRef.value.validate((valid)=>{
        console.log(valid)
        if(valid){
            // console.log(loginForm)
            // localStorage.setItem("token","hanfei")
            axios.post("/webapi/user/login",loginForm).then(res=>{
                console.log(res.data)
                if(res.data.ActionType==="OK"){
                    // console.log(res.data.data)
                    store.commit("changeUserInfo",res.data.data)
                    store.commit("changeGetterRouter",false)
                    router.push('/cart')
                    // localStorage.setItem("token","zhongyi");
                }else{
                    ElMessage.error('用户名和密码不匹配',)
                }
            })
            
        }
    })
    //2.拿到表单内容，提交后台

    //3.设置token
    
}

//配置particles
const option = {
                background: {
                    color: {
                        value: '#2a3b4d'
                    }
                },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: 'push'
                            },
                            onHover: {
                                enable: true,
                                mode: 'repulse'
                            },
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 40
                            },
                            push: {
                                quantity: 4
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4
                            }
                        }
                    },
                    particles: {
                        color: {
                            value: '#ffffff'
                        },
                        links: {
                            color: '#ffffff',
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1
                        },
                        move: {
                            direction: 'none',
                            enable: true,
                            outModes: 'bounce',
                            random: false,
                            speed: 6,
                            straight: false
                        },
                        number: {
                            density: {
                                enable: true,
                            },
                            value: 80
                        },
                        opacity: {
                            value: 0.5
                        },
                        shape: {
                            type: 'circle'
                        },
                        size: {
                            value: { min: 1, max: 5 }
                        }
                    },
                    detectRetina: true
                }
</script>
<style lang="scss" scoped>
.formContainer{
    width: 500px;
    height: 300px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: fade(#000000,50%);
    color: white;
    text-align: center;
    padding: 20px;

    h3{
        font-size:30px;
    }
    .demo-ruleForm{
        margin-top: 20px;
    }
}

::v-deep .el-form-item__label{
    color:white
}
</style>