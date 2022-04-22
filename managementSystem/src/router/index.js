import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
  * Base page without permission requirements
  * Can access all roles
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/wsHome',
    // children: [
    //   {
    //     path: 'dashboard',
    //     component: () => import('@/views/dashboard/index'),
    //     name: 'Dashboard',
    //     meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
    //   }
    // ]
  },
]

export const asyncRoutes = [
  {
    path: '/wsHome',
    component: Layout,
    redirect: '/wsHome/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/wsHome/Dashboard'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard'}
      },
    ]
  },
  {
    path: '/wsVenue',
    component: Layout,
    redirect: '/wsVenue/venueManage',
    children: [
      {
        path: 'venueManage',
        component: () => import('@/views/wsVenue/VenueManage'),
        name: 'VenueManage',
        meta: { title: 'Venue', icon: 'oa_salesSlip'}
      }
    ]
  },
  {
    path: '/wsFacility',
    component: Layout,
    redirect: '/wsFacility/facilityManage',
    children: [
      {
        path: '/facilityManage',
        component: () => import('@/views/wsFacility/FacilityManage'),
        name: 'FacilityManage',
        meta: { title: 'Facility', icon: 'documentation'}
      }
    ]
  },
  {
    path: '/wsCourse',
    component: Layout,
    redirect: '/wsCourse/courseManage',
    children: [
      {
        path: '/courseManage',
        component: () => import('@/views/wsCourse/CourseManage'),
        name: 'CourseManage',
        meta: { title: 'Course', icon: 'form'}
      }
    ]
  },
  {
    path: '/wsOrder',
    component: Layout,
    redirect: '/wsOrder/orderManage',
    children: [
      {
        path: '/orderManage',
        component: () => import('@/views/wsOrder/OrderManage'),
        name: 'OrderManage',
        meta: { title: 'Order', icon: 'clipboard'}
      }
    ]
  },
  {
    path: '/wsUser',
    component: Layout,
    redirect: '/wsUser/userManage',
    children: [
      {
        path: '/userManage',
        component: () => import('@/views/wsUser/UserManage'),
        name: 'UserManage',
        meta: { title: 'User', icon: 'user'}
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
