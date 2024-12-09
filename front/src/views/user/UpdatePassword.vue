<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
  >
    <el-form-item label="旧密码" prop="oldpassword">
      <el-input
        v-model="ruleForm.oldpassword"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="新密码" prop="newpassword">
      <el-input
        v-model="ruleForm.newpassword"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="再次输入密码" prop="renewpassword">
      <el-input
        v-model="ruleForm.renewpassword"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm(ruleFormRef)"
        :loading="loading"
      >
        重置密码
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";

const ruleFormRef = ref<FormInstance>();

const validateold = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error("请输入旧密码"));
  } else {
    callback();
  }
};

const validatenew = (rule: any, value: string, callback: any) => {
  if (value === "") {
    callback(new Error("请输入新密码"));
  } else {
    if (ruleForm.newpassword === ruleForm.oldpassword) {
      callback(new Error("新旧密码不能相同"));
    }
    callback();
  }
};

const validatenew2 = (rule: any, value: string, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入新密码"));
  } else if (value !== ruleForm.newpassword) {
    callback(new Error("两次密码输入不一致"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  oldpassword: "",
  newpassword: "",
  renewpassword: "",
});

const rules = reactive<FormRules>({
  oldpassword: [{ validator: validateold, trigger: "blur" }],
  newpassword: [{ validator: validatenew, trigger: "blur" }],
  renewpassword: [{ validator: validatenew2, trigger: "blur" }],
});

const loading = ref(false);

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      loading.value = true;
      try {
        ElMessage.success("密码更新成功");
        // 重置表单
        resetForm(formEl);
      } catch (error) {
        ElMessage.error("密码更新失败，请稍后再试");
      } finally {
        loading.value = false;
      }
    } else {
      ElMessage.error("表单验证失败，请检查输入");
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped>
.demo-ruleForm {
  margin: 20px auto;
}
</style>
