import { createRouter, createWebHistory } from 'vue-router'

import loginView from '@/views/login/index.vue'

import layoutView from '@/views/layout/index.vue'
import homeView from '@/views/home/index.vue'
import filesBrowsePublicView from '@/views/files/browse/public/index.vue'
import filesBrowsePrivateView from '@/views/files/browse/private/index.vue'
import contactsView from '@/views/contacts/index.vue'
import usersListView from '@/views/users/manage/index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: layoutView,
      redirect: '/home',
      children: [
        { path: 'home', name: 'homeBackground', component: homeView },
        { path: 'files/browse/public', name: 'publicFileList', component: filesBrowsePublicView },
        { path: 'files/browse/private', name: 'privateFileList', component: filesBrowsePrivateView },
        { path: 'contacts', name: 'contactsList', component: contactsView },
        { path: 'users/manage/list', name: 'usersList', component: usersListView },
      ]
    },
    { path: '/login', name: 'login', component: loginView },
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const loginInfo = localStorage.getItem('loginInfo')
  
  // 放行登录页
  if (to.path === '/login') {
    next()
  } else {
    // 其他页面必须登录后才能访问
    if (loginInfo) {
      next()
    } else {
      next('/login') // 未登录，跳转登录页
    }
  }
})

export default router
