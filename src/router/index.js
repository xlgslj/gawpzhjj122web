import Vue from 'vue'
import Router from 'vue-router'

// import h1 from '@/components/HelloWorld'

const Login = () => import('@/pages/login1')
const Login1 = () => import('@/pages/login')

const Main = () => import('@/pages/main')
const home = () => import('@/pages/home/home')

const roles = () => import('@/pages/sys/qxgl/roles')
const users = () => import('@/pages/sys/qxgl/users')
const bm = () => import('@/pages/sys/qxgl/bm')

const menu = () => import('@/pages/sys/csgl/menu')
const sysconfig = () => import('@/pages/sys/csgl/sysconfig')

const viozhxx = () => import('@/pages/zjgl/zhxx')
const logview = () => import('@/pages/zjgl/logview')
const m1sbcj = () => import('@/pages/zjgl/m1/m1sbcj')
const m1zdsh = () => import('@/pages/zjgl/m1/m1zdsh')
const m2zdsh = () => import('@/pages/zjgl/m2/m2zdsh')
const m3sbcj = () => import('@/pages/zjgl/m3/m3sbcj')
const m3ddcscj = () => import('@/pages/zjgl/m3/m3ddcscj')
const m3ddcssh = () => import('@/pages/zjgl/m3/m3ddcssh')
const m4sbcj = () => import('@/pages/zjgl/m4/m4sbcj')

const JcxxptUnitUnitList = () => import('@/pages/jcxxpt/unit/unitlist')
const JcxxptUnitEditAll = () => import('@/pages/jcxxpt/unit/base/uniteditall')
const JcxxptUnitUnitshowall = () => import('@/pages/jcxxpt/unit/base/unitshowall')

const JcxxptVehVehlist = () => import('@/pages/jcxxpt/veh/vehlist')
const JcxxptVehshowall = () => import('@/pages/jcxxpt/veh/base/vehshowall')
const JcxxptVehEditAll = () => import('@/pages/jcxxpt/veh/base/veheditall')

const JcxxptDrvDrvList = () => import('@/pages/jcxxpt/drv//drvlist')
const JcxxptDrvShowBase = () => import('@/pages/jcxxpt/drv/base/drvshowbase')

const ZxxdZczlZdclxxcj = () => import('@/pages/zxxd/zczl/ZxxdZczlZdclxxcj')
const ZxxdZczlUnithome = () => import('@/pages/zxxd/zczl/unithome')
const ZxxdZczlVehhome = () => import('@/pages/zxxd/zczl/vehhome')
const ZxxdZczlViohome = () => import('@/pages/zxxd/zczl/viohome')
const ZxxdZczlVehhmd = () => import('@/pages/zxxd/zczl/vehhmd')
const ZxxdZczlDrvhmd = () => import('@/pages/zxxd/zczl/drvhmd')
const ZxxdZczlUnithmd = () => import('@/pages/zxxd/zczl/unithmd')
const ZxxdZczlBasevehshowall = () => import('@/pages/zxxd/zczl/base/vehshowall')
const ZxxdZczlBaseunitshowall = () => import('@/pages/zxxd/zczl/base/unitshowall')
const ZxxdZczlBasedrvshowall = () => import('@/pages/zxxd/zczl/base/drvshowall')
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
      path: '/login1',
      name: 'Login1',
      component: Login1
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
            roles: roles,
            users: users,
            bm: bm,

            menu: menu,
            sysconfig: sysconfig,

            viozhxx: viozhxx,
            logview: logview,
            m1sbcj: m1sbcj,
            m1zdsh: m1zdsh,
            m2zdsh: m2zdsh,            
            m3sbcj: m3sbcj,
            m3ddcscj: m3ddcscj,
            m3ddcssh: m3ddcssh,
            m4sbcj: m4sbcj,

            ZxxdZczlBasevehshowall: ZxxdZczlBasevehshowall,
            ZxxdZczlBaseunitshowall: ZxxdZczlBaseunitshowall,
            ZxxdZczlBasedrvshowall: ZxxdZczlBasedrvshowall,
            ZxxdZczlZdclxxcj: ZxxdZczlZdclxxcj,
            ZxxdZczlUnithome: ZxxdZczlUnithome,
            ZxxdZczlVehhome: ZxxdZczlVehhome,
            ZxxdZczlViohome: ZxxdZczlViohome,
            ZxxdZczlVehhmd: ZxxdZczlVehhmd,
            ZxxdZczlUnithmd: ZxxdZczlUnithmd,
            ZxxdZczlDrvhmd: ZxxdZczlDrvhmd,

            JcxxptUnitUnitList: JcxxptUnitUnitList,
            JcxxptUnitEditAll: JcxxptUnitEditAll,
            JcxxptUnitUnitshowall: JcxxptUnitUnitshowall,

            JcxxptVehVehlist: JcxxptVehVehlist,
            JcxxptVehshowall: JcxxptVehshowall,
            JcxxptVehEditAll: JcxxptVehEditAll,

            JcxxptDrvDrvList: JcxxptDrvDrvList,
            JcxxptDrvShowBase: JcxxptDrvShowBase
            
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
    }
  ]
})
router.beforeEach((to, from, next) => {
  // console.log('from', from.name, 'to', to.name)
  if (to.name === 'Login' && from.name === 'leve1') {
    /* if (confirm('真的要退出系统吗?')) {
      router.app.$ws.clients.length = 0
      try {
        router.app.$ws.socket.close()
      } catch (e) {

      }
      next()
    } else {
      next(false)
    } */
    router.app.$ws.clients.length = 0
    try {
      router.app.$ws.socket.close()
    } catch (e) {

    }
    next()
  } else {
    next()
  }
})
export default router
