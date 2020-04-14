import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import MerchantRouter from './modules/merchant'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '概览', icon: 'dashboard' }
    }]
  },

  {
    path: '/activity',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'Activity',
        component: () => import('@/views/activity/list'),
        meta: { title: '我的活动', icon: 'activity' }
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/activity/detail/index'),
        meta: { title: '活动管理', icon: 'activity', activeMenu: '/activity/index' },
        hidden: true,
        children: [
          {
            path: 'share/:id(\\d+)',
            component: () => import('@/views/activity/detail/share'),
            name: '分享推广',
            meta: { title: '分享推广', activeMenu: '/activity/index' }
          },
          {
            path: 'overview/:id(\\d+)',
            component: () => import('@/views/activity/detail/overview'),
            name: '访客统计',
            meta: { title: '访客统计', activeMenu: '/activity/index' }
          },
          {
            path: 'data/:id(\\d+)',
            component: () => import('@/views/activity/detail/data'),
            name: '数据汇总',
            meta: { title: '数据汇总', activeMenu: '/activity/index'}
          },
          {
            path: 'danmu/:id(\\d+)',
            component: () => import('@/views/activity/detail/danmu'),
            name: '留言管理',
            meta: { title: '留言', activeMenu: '/activity/index' }
          }
          ,
          {
            path: 'fenxiao/:id(\\d+)',
            component: () => import('@/views/activity/detail/fenxiao'),
            name: '分销管理',
            meta: { title: '分销管理', activeMenu: '/activity/index' }
          }
        ]
      },
      {
        path: 'edit/:id(\\d+)',
        name: 'hdEdit',
        component: () => import('@/views/activity/edit'),
        meta: { title: '活动编辑', icon: 'activity', activeMenu: '/activity/list' },
        hidden: true,
      },
      {
        path: 'create',
        name: 'hdCreate',
        component: () => import('@/views/activity/create'),
        meta: { title: '创建活动', icon: 'activity', activeMenu: '/activity/list' },
        hidden: true
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    redirect: '/member/index',
    name: 'member',
    meta: { title: '会员中心', icon: 'user' },
    children: [
      {
        path: 'index',
        name: 'memberManagement',
        component: () => import('@/views/member/index'),
        meta: { title: '会员管理' }
      },
      {
        path: 'level',
        name: 'memberLevel',
        redirect: '/member/level/list',
        component: () => import('@/views/member/level'),
        meta: { title: '等级设置' },
        children: [
          {
            path: 'list',
            name: 'levelList',
            component: () => import('@/views/member/level/list'),
            meta: { title: '会员等级',  activeMenu: '/member/level/list'}
          },
          {
            path: 'edit/:id(\\d+)',
            name: 'levelEdit',
            component: () => import('@/views/member/level/edit'),
            meta: { title: '等级编辑' , activeMenu: '/member/level/list'},
            hidden: true
          },
          {
            path: 'create',
            name: 'levelCreate',
            component: () => import('@/views/member/level/create'),
            meta: { title: '添加等级' , activeMenu: '/member/level/list'},
            hidden: true
          }
        ]
      },
    ]
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/index',
    name: 'account',
    meta: { title: '账户中心', icon: 'user' },
    children: [
      {
        path: 'index',
        name: 'base',
        component: () => import('@/views/account/index'),
        meta: { title: '个人资料' }
      },
      {
        path: 'plan',
        name: 'plan',
        component: () => import('@/views/account/plan'),
        meta: { title: '套餐', activeMenu: '/account/index' },
        hidden: true
      },
      {
        path: 'store',
        name: 'store',
        redirect: '/account/store/list',
        component: () => import('@/views/account/store/index'),
        meta: { title: '门店管理' },
        children: [
          {
            path: 'list',
            name: 'storeList',
            component: () => import('@/views/account/store/list'),
            meta: { title: '门店管理',  activeMenu: '/account/store/list'}
          },
          {
            path: 'edit/:id(\\d+)',
            name: 'storeEdit',
            component: () => import('@/views/account/store/edit'),
            meta: { title: '门店信息编辑' , activeMenu: '/account/store/list'},
            hidden: true
          },
          {
            path: 'create',
            name: 'storeCreate',
            component: () => import('@/views/account/store/create'),
            meta: { title: '添加门店' , activeMenu: '/account/store/list'},
            hidden: true
          }
        ]
      },
      {
        path: 'staff',
        name: 'staff',
        redirect: '/account/staff/list',
        component: () => import('@/views/account/staff/index'),
        meta: { title: '员工管理' },
        children: [
          {
            path: 'list',
            name: 'staffList',
            component: () => import('@/views/account/staff/list'),
            meta: { title: '员工管理',  activeMenu: '/account/staff/list'}
          },
          {
            path: 'edit/:id(\\d+)',
            name: 'staffEdit',
            component: () => import('@/views/account/staff/edit'),
            meta: { title: '员工信息编辑' , activeMenu: '/account/staff/list'},
            hidden: true
          },
          {
            path: 'create',
            name: 'staffCreate',
            component: () => import('@/views/account/staff/create'),
            meta: { title: '添加员工' , activeMenu: '/account/staff/list'},
            hidden: true
          }
        ]
      },
      {
        path: 'homePage',
        name: 'homePage',
        component: () => import('@/views/account/homePage'),
        meta: { title: '公司主页' }
      },
    ]
  },
  {
    path: '/marketing',
    component: Layout,
    redirect: '/marketing/index',
    name: 'marketing',
    meta: { title: '营销中心', icon: 'user' },
    children: [
      {
        path: 'index',
        name: 'marketingIndex',
        component: () => import('@/views/marketing/index'),
        meta: { title: '数据分析', icon: 'market' }
      }
    ]
  },
  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/index',
    name: 'notice',
    meta: { title: '消息中心', icon: 'message' },
    children: [
      {
        path: 'index',
        name: 'guanfang',
        component: () => import('@/views/notice/index'),
        meta: { title: '官方通知' }
      },
      {
        path: 'hd',
        name: 'huodong',
        component: () => import('@/views/notice/huodong'),
        meta: { title: '活动通知'}
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
