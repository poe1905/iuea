import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import List from '@/views/list'
import Note from '@/views/note'
import Notelist from '@/views/notelist'
import Newfeat from '@/views/newfeat'
import User from '@/views/user'



Vue.use(VueRouter)
const router = new VueRouter({
  // 配置路由表
  routes: [
    {
      name: 'login',
      path: '/',
      component: Login
    },
    {
      name: 'search',
      path: '/home',
      component: Home,
      children: [
        {
          path: '', // 默认子路由
          component: List
        },
        {
          name: 'note',
          path: '/note',
          component: Note
        },
        {
          name: 'notelist',
          path: '/note/:id',
          component: Notelist
        },
        {
          name: 'newfeat',
          path: '/newfeat', // 默认子路由
          component: Newfeat
        },
        {
          name: 'user',
          path: '/user',
          component: User
        }

      ]
    }
  ]
})

export default router
