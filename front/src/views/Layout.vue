<script setup>
import {
  CaretBottom,
  Crop,
  EditPen,
  Management,
  Promotion,
  SwitchButton,
  User,
  UserFilled,
} from "@element-plus/icons-vue";
import avatar from "@/assets/default.png";
// import {userInfoService} from "@/api/user";
import { useUserInfoStore } from "@/stores/userInfo";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { useTokenStore } from "@/stores/token";

const userInfoStore = useUserInfoStore();
const getUserInfo = async () => {
  // const result = await userInfoService();
  // userInfoStore.setUserInfo(result.data);
};
getUserInfo();

const router = useRouter();
const tokenStore = useTokenStore();
const handleCommand = (command) => {
  if (command === "logout") {
    ElMessageBox.confirm("你确认要退出吗？", "温馨提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      // clear data in pinia
      userInfoStore.removeUserInfo();
      tokenStore.removeToken();
      ElMessage.success("退出成功");
      await router.push("/login");
    });
  } else {
    router.push("/user/" + command);
  }
};
</script>

<template>
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <div
        style="
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
          margin-top: 80px;
        "
      >
        <img
          src="@/assets/avatar1.jpg"
          alt="User Avatar"
          style="
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
          "
        />
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 24px;
          width: 100%;
          height: 100px;
        "
      >
        Vic
      </div>
      <el-menu
        active-text-color="#111111"
        background-color="#a2e0f0"
        text-color="#111111"
        router
      >
        <el-menu-item index="/user/usermanage">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/borrow/borrowmanage">
          <el-icon>
            <SwitchButton />
          </el-icon>
          <span>借阅管理</span>
        </el-menu-item>
        <el-menu-item index="/book/bookmanage">
          <el-icon>
            <Management />
          </el-icon>
          <span>图书管理</span>
        </el-menu-item>
        <el-sub-menu>
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/info">
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon>
              <Crop />
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/updatepassword">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div>
          <strong>图书管理系统</strong>
        </div>
        
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <span class="user-name">Vic</span>
            <img
              src="@/assets/avatar1.jpg"
              alt="User Avatar"
              style="
                width: 55px;
                height: 55px;
                border-radius: 50%;
                object-fit: cover;
              "
            />
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="info" :icon="User"
                >基本资料</el-dropdown-item
              >
              <el-dropdown-item command="avatar" :icon="Crop"
                >更换头像</el-dropdown-item
              >
              <el-dropdown-item command="updatepassword" :icon="EditPen"
                >重置密码</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 中间区域 -->
      <el-main>
        <router-view />
      </el-main>
      <!-- 底部区域 -->
      <el-footer>图书管理系统 ©2024 Created by Vic</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #b9e1eb;

    &__logo {
      height: 120px;
      background: no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #7885f8c5;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .user-name {
    margin-right: 10px;
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
