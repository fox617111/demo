<template>
  <div>
    <el-table :data="pagedTableData" stripe style="width: 100%">
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="name" label="昵称" width="180" />
      <el-table-column prop="registertime" label="注册时间" width="180" />
      <el-table-column prop="birthday" label="生日" width="180" />
      <el-table-column prop="role" label="角色" width="180" />
      <el-table-column prop="sex" label="性别" width="180" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="handleEdit(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="handleDelete(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
  </div>

  <el-drawer v-model="isdrawer" direction="rtl" :title="user.username">
    <template #header>
      <h4>编辑</h4>
    </template>
    <template #default>
      <el-form :model="user" label-width="auto" style="max-width: 600px">
        <el-form-item label="用户名">
          <el-input v-model="user.username" disabled="true" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="user.name" />
        </el-form-item>
        <el-form-item label="注册日期">
          <el-input
            v-model="user.registertime"
            disabled="true"
            disable="disable"
          />
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="user.birthday"
            type="date"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="user.sex">
            <el-radio value="男">男</el-radio>
            <el-radio value="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="user.role" disabled="true" disable="disable" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button type="info" @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">保存</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";

const tableData = ref([
  {
    id: 11,
    username: "user11",
    name: "刘一",
    registertime: "2023-01-11",
    birthday: "1980-01-01",
    role: "普通用户",
    sex: "男",
  },
  {
    id: 12,
    username: "user12",
    name: "陈二",
    registertime: "2023-01-12",
    birthday: "1981-01-01",
    role: "普通用户",
    sex: "女",
  },
  {
    id: 13,
    username: "user13",
    name: "杨三",
    registertime: "2023-01-13",
    birthday: "1982-01-01",
    role: "普通用户",
    sex: "男",
  },
  {
    id: 14,
    username: "user14",
    name: "黄四",
    registertime: "2023-01-14",
    birthday: "1983-01-01",
    role: "普通用户",
    sex: "女",
  },
  {
    id: 15,
    username: "user15",
    name: "朱五",
    registertime: "2023-01-15",
    birthday: "1984-01-01",
    role: "普通用户",
    sex: "男",
  },
  {
    id: 16,
    username: "user16",
    name: "何六",
    registertime: "2023-01-16",
    birthday: "1985-01-01",
    role: "普通用户",
    sex: "女",
  },
  {
    id: 17,
    username: "user17",
    name: "高七",
    registertime: "2023-01-17",
    birthday: "1986-01-01",
    role: "普通用户",
    sex: "男",
  },
  {
    id: 18,
    username: "user18",
    name: "许八",
    registertime: "2023-01-18",
    birthday: "1987-01-01",
    role: "普通用户",
    sex: "女",
  },
  {
    id: 19,
    username: "user19",
    name: "郭九",
    registertime: "2023-01-19",
    birthday: "1988-01-01",
    role: "普通用户",
    sex: "男",
  },
  {
    id: 20,
    username: "user20",
    name: "徐十",
    registertime: "2023-01-20",
    birthday: "1989-01-01",
    role: "普通用户",
    sex: "女",
  },
  {
    id: 21,
    username: "user21",
    name: "冯十一",
    registertime: "2023-01-21",
    birthday: "1980-02-01",
    role: "普通用户",
    sex: "男",
  },
  {
    id: 22,
    username: "user22",
    name: "史十二",
    registertime: "2023-01-22",
    birthday: "1981-02-01",
    role: "普通用户",
    sex: "女",
  },
  {
    id: 23,
    username: "user23",
    name: "傅十三",
    registertime: "2023-01-23",
    birthday: "1982-02-01",
    role: "普通用户",
    sex: "男",
  },
  {
    id: 24,
    username: "user24",
    name: "沈十四",
    registertime: "2023-01-24",
    birthday: "1983-02-01",
    role: "普通用户",
    sex: "女",
  },
  {
    id: 25,
    username: "user25",
    name: "曾十五",
    registertime: "2023-01-25",
    birthday: "1984-02-01",
    role: "普通用户",
    sex: "男",
  },
  {
    id: 26,
    username: "user26",
    name: "彭十六",
    registertime: "2023-01-26",
    birthday: "1985-02-01",
    role: "普通用户",
    sex: "女",
  },
  {
    id: 27,
    username: "user27",
    name: "任十七",
    registertime: "2023-01-27",
    birthday: "1986-02-01",
    role: "普通用户",
    sex: "男",
  },
  {
    id: 28,
    username: "user28",
    name: "袁十八",
    registertime: "2023-01-28",
    birthday: "1987-02-01",
    role: "普通用户",
    sex: "女",
  },
  {
    id: 29,
    username: "user29",
    name: "于十九",
    registertime: "2023-01-29",
    birthday: "1988-02-01",
    role: "普通用户",
    sex: "男",
  },
  {
    id: 30,
    username: "user30",
    name: "蒋二十",
    registertime: "2023-01-30",
    birthday: "1989-02-01",
    role: "普通用户",
    sex: "女",
  },
]);

const currentPage = ref(1);
const pageSize = ref(10);

const pagedTableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return tableData.value.slice(start, end);
});

const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize;
};

const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
};

const user = ref({
  id: 0,
  username: "",
  name: "",
  registertime: "",
  birthday: "",
  role: "",
  sex: "",
});

const isdrawer = ref(false);

let index = 0;

const handleEdit = (row) => {
  user.value = JSON.parse(JSON.stringify(row));
  index = tableData.value.findIndex((item) => item.id === row.id);
  isdrawer.value = true;
};

//删除
const handleDelete = (row) => {
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
const cancelClick = () => {
  isdrawer.value = false;
  ElMessage({
    type: "info",
    message: "取消编辑",
  });
};
const confirmClick = (row) => {
  ElMessageBox.confirm("确定要保存吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      if (index !== -1) {
        // 使用 user.value 而不是 user
        tableData.value.splice(index, 1, user.value);
        ElMessage({
          type: "success",
          message: "编辑成功",
        });
        isdrawer.value = false;
      } else {
        ElMessage({
          type: "error",
          message: "未找到要编辑的项",
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
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px; /* 可以根据需要调整间距 */
}
</style>
