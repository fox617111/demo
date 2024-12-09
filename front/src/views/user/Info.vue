<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="用户名">
      <el-input v-model="form.username" disabled="true" />
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="form.name" :disabled="isDisable" />
    </el-form-item>
    <el-form-item label="注册日期">
      <el-input v-model="form.registertime" disabled="true" />
    </el-form-item>
    <el-form-item label="生日">
      <el-date-picker
        v-model="form.birthday"
        type="date"
        :placeholder="content"
        style="width: 100%"
        :disabled="isDisable"
      />
    </el-form-item>
    <el-form-item label="角色">
      <el-input v-model="form.role" disabled="true" />
    </el-form-item>
    <el-form-item label="性格">
      <el-checkbox-group v-model="form.character" :disabled="isDisable">
        <el-checkbox value="1" name="type"> 开朗 </el-checkbox>
        <el-checkbox value="2" name="type"> 大方 </el-checkbox>
        <el-checkbox value="3" name="type"> 内向 </el-checkbox>
        <el-checkbox value="4" name="type"> 神秘 </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="form.sex" :disabled="isDisable">
        <el-radio value="1">男</el-radio>
        <el-radio value="0">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="form.describe" type="textarea" :disabled="isDisable" />
    </el-form-item>
    <el-form-item v-if="isEdit">
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="offEdit">取消</el-button>
    </el-form-item>
    <el-form-item v-else>
      <el-button type="primary" @click="onEdit">编辑</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ElMessageBox ,ElMessage} from "element-plus";
import { reactive, ref, computed } from "vue";

const isEdit = ref(false);
const isDisable = ref(true);
const onEdit = () => {
  //编辑
  isDisable.value = false;
  isEdit.value = true;
};
const offEdit = () => {
  //取消编辑
  isDisable.value = true;
  isEdit.value = false;
  form.value = user.value;
};
const content = computed(() => {
  return form.value.birthday ? "" : "请选择生日";
});
// do not use same name with ref
const form = ref({
  username: "admin",
  name: "Vic",
  registertime: "2024-11-05",
  birthday: "2024-12-02",
  role: "超级管理员",
  sex: "1",
  character: ["1","2"],
  describe: "Java实习生一枚~",
});

const user=ref({
  username: "admin",
  name: "Vic",
  registertime: "2024-11-05",
  birthday: "2024-12-02",
  role: "超级管理员",
  sex: "1",
  character: ["1","2"],
  describe: "Java实习生一枚~",
});

const onSubmit = () => {
  ElMessageBox.alert("你确定要进行修改吗", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    showCancelButton: true, 
    type: "warning",
  }).then(() => {
    ElMessage.success("修改成功");
    isDisable.value = true;
    isEdit.value = false;
  }).catch(() => {
    isDisable.value = true;
    isEdit.value = false;
    form.value = user.value;
    ElMessage.info("取消成功");
  });
};
</script>
