//封装所有和用户相关的接口函数
import  request from '@/utils/http'

export const loginAPI = ({account,password})=>{
    return request({
        url:'/login',
        methods:'POST',
        data :{
            account,
            password 
        },
    })
}