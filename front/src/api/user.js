// user.js
import { ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';

export const user = ref({});

export const handleEdit = (row, tableData) => {
  ElMessageBox.confirm("确定要编辑吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      const index = tableData.value.findIndex((item) => item.id === row.id);
      user.value = { ...row };
      if (index !== -1) {
        // 使用 user.value 而不是 user
        tableData.value.splice(index, 1, user.value);
        ElMessage({
          type: "success",
          message: "编辑成功",
        });
      } else {
        ElMessage({
          type: "error",
          message: "未找到要删除的项",
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消编辑",
      });
    });
};

//删除
export const handleDelete = (row) => {
    ElMessageBox.confirm("确定要删除吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        const index = tableData.value.findIndex((item) => item.id === row.id);
        if (index !== -1) {
          tableData.value.splice(index, 1);
          ElMessage({
            type: "success",
            message: "删除成功",
          });
        } else {
          ElMessage({
            type: "error",
            message: "未找到要删除的项",
          });
        }
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消删除",
        });
      });
  };