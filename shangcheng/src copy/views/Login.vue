<template>
    <div>
        <header class="login-header">
            <div class="container m-top-20">
                <h1 class="logo">
                    <router-link to="/">中药商店</router-link>
                </h1>
                <router-link class="entry" to="/">
                    进入网站首页
                    <i class="iconfont icon-you"></i>
                    <i class="iconfont icon-you"></i>
                </router-link>
            </div>
        </header>
        <section class="login-section">
            <div class="wrapper">
                <nav>
                    <a href="javascript:;">账号登录</a>
                </nav>
                <div class="account-box">
                    <div class="form">
                        <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="60px" status-icon>
                            <el-form-item prop="account" label="账户">
                                <el-input v-model="form.account" />
                            </el-form-item>
                            <el-form-item prop="password" label="密码">
                                <el-input v-model="form.password" />
                            </el-form-item>
                            <el-form-item prop="agree" label-width="22px">
                                <el-checkbox size="large" v-model="form.agree">
                                    我已同意隐私条款和服务条款
                                </el-checkbox>
                            </el-form-item>
                            <el-button size="large" class="subBtn" @click="dologin">点击登录</el-button>
                        </el-form>
                    </div>
                </div>
            </div>
        </section>
        <footer class="login-footer">
            <div class="container">
                <p>
                    <a href="javascript:;">关于我们</a>
                    <a href="javascript:;">帮助中心</a>
                    <a href="javascript:;">售后服务</a>
                    <a href="javascript:;">配送与验收</a>
                    <a href="javascript:;">商务合作</a>
                    <a href="javascript:;">搜索推荐</a>
                    <a href="javascript:;">友情链接</a>
                </p>
                <p>CopyRight &copy;中药商店</p>
            </div>
        </footer>
    </div>
</template>
 
<script  setup>
    import {loginAPI} from'@/api/user'
    import {ref} from 'vue'
    import { ElMessage } from 'element-plus'
    import 'element-plus/theme-chalk/el-message.css'
    //表单对象
    const form = ref({
        account:'',
        password:'',
        agree:true
    })
    //规则对象
    const rules = {
        account:[
            {required:true,messge:'用户名不能为空',trigger:'blur'}
        ],
        password:[
            {required:true,messge:'密码不能为空',trigger:'blur'},
            {min: 6,max:14, messge:'密码长度为6到14个字符',trigger:'blur'}
        ],
        agree:[
        {
            validator:(rule,value,callback)=>{
                console.log(value)
                //自定义校验逻辑
                //勾选就通过，不勾选就不通过
                if(value){
                    callback()
                }else{
                    callback(new Error('请勾选协议'))
                }
            }
        }
    ]
}
    //获取form实例做统一校验
    const formRef = ref  (null)
    const dologin = ()=>{
        const{account,password} = form.value
    //调用实例方法
        formRef.value.validate(async(valid)=>{
        //valid:所有表单都通过校验才为true
            console.log(valid)
        //以valid做为判断条件 如果通过检验才执行登录逻辑
            if(valid){
               const res = await loginAPI({account,password})
               console.log(res)
               //提示用户
                ElMessage({type:'success',message:'登录成功'})
               //跳转首页
            }
        })
}  
</script>

<style lang="less" scoped>
    .login-header{
        background-color: #fff;
        display: flex;
        .logo{
            padding: 40px;
            flex: 1;
            
        }
        
        .entry{
            text-align: right;
            margin-right: 5px;
            width: 120px;
            margin-bottom:38px;
            font-size: 16px;
            &:hover{
                color: @xtxColor ;
            }
            i{
                font-size: 14px;
                color: @xtxColor;
                letter-spacing: -5px;
            }
        }   
        
    }
    .login-section{
        background: url('@/assets/logo.png') no-repeat center / cover;
        height: 488px;
        position: relative;
        .wrapper{
            width: 380px;
            background-color: #fff;
            position: absolute;
            left: 50%;
            top: 54px;
            transform: translate3d(100px,0,0);
            box-shadow: 0 0 10px black;
            text-align: center;
            
            nav{
                font-size: 14px;
                height: 55px;
                margin-bottom: 20px;
                border-bottom: 1px solid #f5f5f5;
                display: flex;
                padding: 0 40px;
                text-align: right;
                align-items: center;
                color: #fff;
                text-align: center;
                line-height: 40px;
                background: @xtxColor;
            }
            &.disabled{
                background: #cdcdcd;
            }
        }
    }
    .action{
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .url{
            a{
                color:#ccc;
                margin-left: 10px;
            }
        }
    }
    .subBtn{
        background-color: @xtxColor;
        width: 100%;
        color:#fff;
    }

</style>