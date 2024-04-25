<template>
  <div class="container">
    <div
      class="yaoshan-header"
      :style="{
        backgroundImage: `url(${require('@/assets/yaoshan-header.webp')})`,
      }"
    ></div>
    <div class="center">药书</div>
    <div class="footer">为您介绍药书的内容，让您随时了解并学习</div>
    <div class="search">
      <el-popover
        placement="bottom"
        title="搜索结果"
        width="50%"
        :visible="visible"
      >
        <template #reference>
          <el-input
            v-model="searchText"
            class="w-50 m-2"
            placeholder="请输入关键字"
            :prefix-icon="Search"
            type="search"
            size="large"
            @input="visible = true"
            @blur="visible = false"
          />
        </template>
        <div v-if="searchproductlist.length">
          <div
            v-for="data in searchproductlist"
            :key="data._id"
            class="search-item"
            @click="handleChangepage(data._id)"
          >
            {{ data.title }}
          </div>
        </div>
        <div v-else>
          <el-empty description="暂无内容" :image-size="50"></el-empty>
        </div>
      </el-popover>
    </div>
    <div class="topyaoshan">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in topProductList" :key="item._id">
          <el-card
            style="margin-top: 20px"
            :body-style="{ padding: '0px' }"
            shadow="hover"
            @click="handleChangepage(item._id)"
          >
            <div style="padding: 14px">
              <span>{{ item.title }}</span>
              <div class="bottom">
                <time class="time">{{ whichTime(item.editTime) }}</time>
              </div>
            </div>
            <div
              class="image"
              :style="{
                backgroundImage: `url(http://localhost:3000${item.cover})`,
              }"
            ></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import moment from "moment";

const searchText = ref("");
const visible = ref(false);
const productlist = ref([]);

onMounted(async () => {
  var res = await axios.get("/webapi/product/list");
  //    console.log(res.data)
  productlist.value = res.data.data;
});

const searchproductlist = computed(() =>
  searchText.value
    ? productlist.value.filter((item) => item.title.includes(searchText.value))
    : []
);

const topProductList = computed(() => productlist.value.slice());

const whichTime = (time) => {
  return moment(time).format("YYYY年MM月DD日 HH:mm");
};

const router = useRouter();
const handleChangepage = (id) => {
  router.push(`/product/${id}`);
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.yaoshan-header {
  width: 100%;
  height: 400px;
  background-size: cover;
}
.search {
  position: absolute;
  top: 300px;
  width: 100%;
  text-align: center;
  .el-input {
    width: 50%;
  }
}
.center {
  position: absolute;
  left: 50%;
  top: 100px;
  transform: translate(-50%, -50%);
  height: 100px;
  line-height: 100px;
  font-size: 60px;
  color: #ccc;
  text-align: center;
}
.footer {
  position: absolute;
  left: 50%;
  top: 170px;
  transform: translate(-50%, -50%);
  height: 100px;
  line-height: 100px;
  font-size: 30px;
  color: #ccc;
  text-align: center;
}
.search-item {
  height: 50px;
  line-height: 50px;
  &:hover {
    background: whitesmoke;
    color: green;
    cursor: pointer;
  }
}
.topyaoshan {
  margin: 20px;
  .image {
    width: 100%;
    height: 150px;
    background-size: 100% 100%;
  }
  .time {
    font-size: 13px;
    color: #ccc;
  }
}
</style>