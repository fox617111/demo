import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout.vue'
import Login from '@/views/user/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'layout',
      redirect: '/user/usermanage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Layout,
      children:[
        {path:'/user/updatepassword',name:'updatepassword',component:()=>import('@/views/user/UpdatePassword.vue')},
        {path:'/user/avatar',name:'avatar',component:()=>import('@/views/user/Avatar.vue')},
        {path:'/user/info',name:'info',component:()=>import('@/views/user/Info.vue')},
        {path:'/user/usermanage',name:'usermanage',component:()=>import('@/views/user/UserManage.vue')},
        {path:'/book/bookmanage',name:'bookmanage',component:()=>import('@/views/book/BookManage.vue')},
        {path:'/borrow/borrowmanage',name:'borrowmanage',component:()=>import('@/views/borrow/BorrowManage.vue')}



      ]
    },
  ],
})

export default router
