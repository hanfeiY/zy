<template>
  <div>
    <el-form
      ref="userFormRef"
      style="max-width: 600px"
      :model="userForm"
      :rules="userFormRules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <!-- 电话 -->
      <el-form-item label="电话" prop="dianhua">
        <el-input />
      </el-form-item>
      <!-- 收获地址 -->
      <el-form-item label="收货地址" prop="where">
        <el-input />
      </el-form-item>
      <!-- 收件人 -->
      <el-form-item label="收件人" prop="username">
        <el-input />
      </el-form-item>
      <!-- 支付 -->
      <el-form-item label="支付" prop="pay">
        <img src="../assets/images/saoma.png" alt="" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
const userFormRef = ref();
const userForm = reactive({
  username: "",
  dianhua: "",
  where: "",
  file: null,
});
const userFormRules = reactive({
  dianhua: [{ required: true, message: "请输入电话", trigger: "blur" }],
  where: [{ required: true, message: "请输入地址", trigger: "blur" }],
  username: [{ required: true, message: "请选择名称", trigger: "blur" }],
});
</script>