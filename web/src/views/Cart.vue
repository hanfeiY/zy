<template>
  <div>
    <h3 style="color: rgb(74, 180, 232)">购物车</h3>
    <table border="1" cellspacing="0">
      <thead>
        <tr>
          <th>勾选</th>
          <th>序号</th>
          <th>名称</th>
          <th>单价</th>
          <th>购买数量</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(yaocai, index) in cartList" :key="index">
          <td><input type="checkbox" v-model="yaocai.check" /></td>
          <td>{{ index + 1 }}</td>
          <td>{{ yaocai.name }}</td>
          <td>￥{{ yaocai.price }}</td>
          <td>
            <button :disabled="yaocai.num === 0" @click="yaocai.num--">
              -
            </button>
            {{ yaocai.num }}
            <button @click="yaocai.num++">+</button>
          </td>
          <td>
            <button>删除</button>
            <!-- @click="deleteYaoCai(index)" -->
          </td>
          <td>
            <button>提交</button>
            <!-- @click="sendData" -->
          </td>
        </tr>
      </tbody>
    </table>
    <span>总价：￥{{ totalPrice }}元</span><br />
    <el-button type="success" @click="submitForm()"> 支付 </el-button>
  </div>
</template>
<script>
// 引入useCartStore
import axios from "axios";
import { useCartStore } from "../store/cartStore";
export default {
  name: "Cart",
  data() {
    return {
      cartList: [],
      orderList: [],
    };
  },
  created() {
    //获取Store实例对象
    this.cartStore = useCartStore();
    //获取cartStore.cartList的地址
    this.cartList = this.cartStore.cartList;
  },

  methods: {
    sendData() {
      //遍历购物车数组，生成要发送的"订单数组"
      this.cartList.forEach((yaocai) => {
        let order = { title: "", price: 0, num: 1 };
        if (yaocai.check) {
          order.title = yaocai.name;
          order.price = yaocai.price;
          order.num = yaocai.num;
          this.orderList.push(order);
        }
      });
      axios
        .post("/webapi/orderlist/insertmany", this.orderList)
        .then((res) => {
          console.log("res:", res);
          this.cartStore.cartList = [];
          this.cartList = this.cartStore.cartList;
          this.$router.push("/orderlist");
        })
        .catch((err) => {
          console.log(err);
          console.log("数据发送失败");
        });
    },
    submitForm() {
      this.$router.push("/zhifu");
    },
  },
  computed: {
    totalPrice() {
      let totalPrice = 0;
      //遍历数组，计算总价
      this.cartList.forEach((yaocai) => {
        if (yaocai.check) {
          totalPrice = totalPrice + yaocai.price * yaocai.num;
        }
      });
      return totalPrice;
    },
  },
};
</script>
<style scoped>
div {
  color: rgb(34, 35, 35);
  background-color: rgba(245, 255, 240, 0.574);
}
/* 表格样式 */
h3 {
  color: rgb(200, 21, 24);
}
h4 {
  color: rgb(10, 134, 128);
}
</style>