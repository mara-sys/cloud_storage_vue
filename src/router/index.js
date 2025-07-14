import { createRouter, createWebHistory } from 'vue-router'

import loginView from '@/views/login/index.vue'

import layoutView from '@/views/layout/index.vue'
import homeView from '@/views/home/index.vue'
import filesBrowsePublicView from '@/views/files/browse/public/index.vue'
import filesBrowsePrivateView from '@/views/files/browse/private/index.vue'
import contactsView from '@/views/contacts/index.vue'


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
      ]
    },
    { path: '/login', name: 'login', component: loginView },
  ]
})

export default router
