<!-- 组件的模板 -->
<template>
    <div class="div1">
        <div class="yaoshan-header" :style="{
            backgroundImage:`url(${require('@/assets/yaoshan-header.webp')})`
        }">
        </div>
        <!-- <div class="center">商品</div> -->
        <div class="footer">让您方便购买，让您随时购买并加入购物车</div>
        <el-card>
        <h4>商场</h4>
        <!-- 图书种类选择下拉框 -->
    
        <h3 style="margin-top:10px;marigin-left:30px">商品种类:</h3>
    <el-row :gutter="20" style="margin-top:20px">
        <el-col :span="12" >
            <el-select v-model="currentType" placeholder="Select" >

    
            <el-option
                v-for="item in yaocaiType"
                :key="item.id"
                :label="item.displayName"
                :value="item.id"
            />
            </el-select>
        </el-col>
        <el-col :span="12" >
            <el-input v-model="keyWord"  :prefix-icon="Search" placeholder="请输入商品名" />
        </el-col>
    </el-row>
        
        <div class="topyaoshan">
            <el-row :gutter="20">
                <el-col 
                    :span="6" 
                    v-for="(yaocai,index) in yaocaiListFilter" 
                    :key="yaocai._id"
                >
                <el-card 
                        style="margin-top: 20px;"
                        :body-style="{padding:'0px'}" 
                        shadow="hover"
                    >
                    <div style="padding:14px">
                        <span>{{ yaocai.yaocaiid }}</span>
                        <br/>
                        <span>{{ yaocai.title }}</span>
                    </div>
                    <div class="iconfont icon-cart" style="
                            position: absulote;
                            width: 50px;
                            font-size:50px;
                            text-align: center;
                            &:hover{
                                background: whitesmoke;
                                color: green;
                                cursor:pointer
                            }" 
                            @click="addCart(index)">
                        </div>
                </el-card>
                </el-col>
            </el-row>
        </div>
    </el-card>
    </div>
</template>
<script>
    import {useCartStore} from '../store/cartStore'
    import axios from 'axios'
    import { Search } from '@element-plus/icons-vue'
    export default {                  
        name:'YaoCaiList',
        data() {
            return{
                Search,
                //选择的图书类别
                currentType:'000',
                keyWord:'',
                // 图书类别数组
                yaocaiType:[
                    {id:'000',displayName:'全部类型'},
                    {id:'001',displayName:'甘性药材'},
                    {id:'002',displayName:'苦性药材'},
                    {id:'003',displayName:'辛性药材'},
                    {id:'004',displayName:'酸性药材'},
                    {id:'005',displayName:'咸性药材'},
                ],
                cart:{name:'',price:0,num:1,check:true},
                cartList:[],          
                //图书List
                yaocaiList:[
                    {yaocaiid:1,type:'001',title:'人参',price:192.53},
                    {yaocaiid:2,type:'001',title:'甘草',price:26.36},
                    {yaocaiid:3,type:'001',title:'党参',price:86.56},
                    {yaocaiid:4,type:'001',title:'黄芪',price:35.64},
                    {yaocaiid:5,type:'001',title:'当归',price:67},
                    {yaocaiid:6,type:'002',title:'苦参',price:14.28},
                    {yaocaiid:7,type:'002',title:'黄连',price:192.76},
                    {yaocaiid:8,type:'002',title:'黄芩',price:23.04},                         
                    {yaocaiid:9,type:'003',title:'麻黄',price:45},                             
                    {yaocaiid:10,type:'003',title:'桂枝',price:10},                             
                    {yaocaiid:11,type:'003',title:'荆芥',price:18.5},                             
                    {yaocaiid:12,type:'004',title:'五味子',price:45.69},                             
                    {yaocaiid:13,type:'004',title:'山茱萸',price:43.15},                             
                    {yaocaiid:14,type:'004',title:'乌梅',price:11.4},                             
                    {yaocaiid:15,type:'005',title:'何首乌',price:10.5},                            
                    {yaocaiid:16,type:'005',title:'砂仁',price:20.73},                             
                    {yaocaiid:17,type:'006',title:'冬虫夏草',price:120.68},                             
                    {yaocaiid:18,type:'006',title:'桂花',price:166.91},                             
                ],
                
            }
        },
       
        created() {
            this.cartList = useCartStore().cartList
        },
        mounted() {
            // console.log('开始读数据')
            // axios.get('/webapi/yaocailist/getall')
            // .then(res=>{
            //     console.log("成功返回数据：",res.data)
            //     this.yaocaiList=res.data
            // })
            // .catch(err=>{
            //     console.log(err)
            // })
            console.log('开始读数据')
            axios.get('/webapi/orderlist/getall')
            .then(res=>{
                console.log("成功返回数据：",res.data)
                this.orderList=res.data
            })
            .catch(err=>{
                console.log(err)
            })
        },
        methods: {
            // 添加购物车
            addCart(index){
                console.log(index)
                this.cart.name = this.yaocaiListFilter[index].title
                this.cart.price = this.yaocaiListFilter[index].price
                this.cart.num = 1
                this.cart.check = true
                console.log(this.cart)
                this.cartList.push(this.cart)
                console.log(this.cartList)
                this.$router.push('/cart')
            }
        },    
        computed:{
            //过滤图书列表-计算属性
            yaocaiListFilter(){
                let yaocaitype = this.currentType
                let keyword = this.keyWord
                console.log(yaocaitype,keyword)
                if(this.currentType === "000") yaocaitype = ''
                return  this.yaocaiList.filter((d)=>{
                        return d.type.indexOf(yaocaitype) !== -1 && d.title.indexOf(keyword) !== -1
                })                    
            }
        }
    }

</script>
<style scoped lang="scss">
    v-deep .div1{
        list-style-type: none;
        float: center;
        text-align: left; 
        color:rgb(34, 35, 35);
        background-color: rgba(255, 249, 240, 0.601);
    }
    /* 表格样式 */
    h3{
        color:rgb(200, 21, 24);
    }
    h4{
        position: absolute;
        left: 50%;
        top: 100px;
        transform: translate(-50%,-50%);
        height: 100px;
        line-height: 100px;
        font-size: 60px;
        color: #ccc;
        text-align: center;
    } 
    .table{
        margin-top: 15px;
        text-align: center;
        width: auto;
        border: 1px solid rgba(0, 128, 87, 0.529)
    } 
    
    td{
        text-align:center;
        height:50px;
        vertical-align:bottom;
        padding:15px;
        
    }
    th{
        background-color:rgba(66, 128, 0, 0.774);
        color:white;
        height:50px;
    }
    .yaoshan-header{
        width: 100%;
        height: 400px;
        background-size: cover ;
    }
    .footer{
        position: absolute;
        left: 50%;
        top: 170px;
        transform: translate(-50%,-50%);
        height: 100px;
        line-height: 100px;
        font-size: 30px;
        color: #ccc;
        text-align: center;
    }    
</style>







<!-- 书名过滤输入框 -->
        <!-- 书名：<input type="text" placeholder="请输入书名" v-model.lazy="keyWord" maxlength="3"> -->


<!-- <table border="3" cellspacing="10" class="table">
            <thead>
                <tr>
                    <th class="xuhao">序号</th>
                    <th>名称</th>
                    <th>单价（元）</th>
                    <th>购买操作</th>
                </tr>
            </thead>
            <tbody>
                <!-- 图书列表渲染 -->
                <!-- <tr v-for="(yaocai,index) in yaocaiListFilter" :key="yaocai.id">
                    <td>{{yaocai.yaocaiid}}</td>
                    <td>{{yaocai.title}}</td>
                    <td>{{yaocai.price}}</td>
                    <td>
                        <div class="iconfont icon-cart" style="
                            position: absulote;
                            width: 50px;
                            font-size:50px;
                            text-align: center;
                            &:hover{
                                background: whitesmoke;
                                color: green;
                                cursor:pointer
                            }" 
                            @click="addCart(index)">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table> --> 