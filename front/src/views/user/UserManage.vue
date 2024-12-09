<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="用户" name="user"><User/></el-tab-pane>
      <el-tab-pane label="图书管理员" name="manager"><Manager/></el-tab-pane>
    </el-tabs>

  </template>
  <script lang="ts" setup>
  import { ref } from 'vue'
  import type { TabsPaneContext } from 'element-plus'
  import User from './User.vue';
  import Manager from './Manager.vue';
  
  const activeName = ref('user')
  
  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
  }
  </script>
  
  <style>
  .demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
  </style>