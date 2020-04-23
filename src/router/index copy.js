import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Main from '@/pages/main'

import h1 from '@/components/HelloWorld'
import home from '@/pages/default'

import menu from '@/pages/sys/qxgl/menu'
import roles from '@/pages/sys/qxgl/roles'
import users from '@/pages/sys/qxgl/users'

Vue.use(Router)

var router = new Router({
  mode: 'history', // 去掉url中的#
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'leve1',
          name: 'leve1',
          components: {
            home: home,
            menu: menu,
            roles: roles,
            users: users
          }
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/menu',
      name: 'menu',
      component: menu
    },
    {
      path: '/right',
      name: 'right',
      component: h1
    }
  ]
})
router.beforeEach((to, from, next) => {
  // console.log('from', from.name, 'to', to.name)
  if (to.name === 'Login' && from.name === 'leve1') {
    if (confirm('真的要退出系统吗?')) {
      router.app.$ws.clients.length = 0
      next()
    } else {
      next(false)
    }
  } else {
    next()
  }
})
export default router
