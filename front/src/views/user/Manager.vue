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
import { ElMessageBox, ElMessage } from "element-plus";

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

const tableData = ref([
  {
    id: 1,
    username: "user1",
    name: "张三",
    registertime: "2023-01-01",
    birthday: "1990-01-01",
    role: "管理员",
    sex: "男",
  },
  {
    id: 2,
    username: "user2",
    name: "李四",
    registertime: "2023-01-02",
    birthday: "1991-01-01",
    role: "管理员",
    sex: "女",
  },
  {
    id: 3,
    username: "user3",
    name: "王五",
    registertime: "2023-01-03",
    birthday: "1992-01-01",
    role: "管理员",
    sex: "男",
  },
  {
    id: 4,
    username: "user4",
    name: "赵六",
    registertime: "2023-01-04",
    birthday: "1993-01-01",
    role: "管理员",
    sex: "女",
  },
  {
    id: 5,
    username: "user5",
    name: "孙七",
    registertime: "2023-01-05",
    birthday: "1994-01-01",
    role: "管理员",
    sex: "男",
  },
  {
    id: 6,
    username: "user6",
    name: "周八",
    registertime: "2023-01-06",
    birthday: "1995-01-01",
    role: "管理员",
    sex: "女",
  },
  {
    id: 7,
    username: "user7",
    name: "吴九",
    registertime: "2023-01-07",
    birthday: "1996-01-01",
    role: "管理员",
    sex: "男",
  },
  {
    id: 8,
    username: "user8",
    name: "郑十",
    registertime: "2023-01-08",
    birthday: "1997-01-01",
    role: "管理员",
    sex: "女",
  },
  {
    id: 9,
    username: "user9",
    name: "钱十一",
    registertime: "2023-01-09",
    birthday: "1998-01-01",
    role: "管理员",
    sex: "男",
  },
  {
    id: 10,
    username: "user10",
    name: "孙十二",
    registertime: "2023-01-10",
    birthday: "1999-01-01",
    role: "管理员",
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
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px; /* 可以根据需要调整间距 */
}
</style>
