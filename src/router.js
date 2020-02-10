import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import List from '@/views/list'



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
          name: 'home',
          path: '', // 默认子路由
          component: List
        }
      
      ]
    },
    // {
    //   name: 'search-result',
    //   path: '/search/:q',
    //   component: SearchResult
    // },
    // {
    //   name: 'article',
    //   path: '/article/:articleId',
    //   component: Article
    // },
    // {
    //   name: 'user',
    //   path: '/user',
    //   component: User
    // },
    // {
    //   name: 'chat',
    //   path: '/chat',
    //   component: Chat
    // },
    // {
    //   // 嵌套路由如果有默认子路由，则不需要 name
    //   // name: 'tabbar',
    //   path: '/',
    //   component: Tabbar,
    //   children: [
    //     {
    //       name: 'home',
    //       path: '', // 默认子路由
    //       component: Home
    //     },
    //     {
    //       name: 'my',
    //       path: '/my', // 默认子路由
    //       component: My
    //     }
    //   ]
    // }
  ]
})

export default router
