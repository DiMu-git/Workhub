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
 * 没有权限要求的基页
 * 可以访问所有角色
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
// menuSalesSlipList   
// menuOutGoodsList  
// menuPaymentList 
// menuReceiptList
// menuCustomerMana
// menuSalaryMana
// menuPeopleMana


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
        meta: { title: 'dashboard', icon: 'oa_salesSlip'}
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
        meta: { title: 'venueMana', icon: 'oa_salesSlip'}
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
        meta: { title: 'facilityMana', icon: 'oa_salesSlip'}
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
        meta: { title: 'courseMana', icon: 'oa_salesSlip'}
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
        meta: { title: 'orderMana', icon: 'oa_salesSlip'}
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
        meta: { title: 'userMana', icon: 'oa_salesSlip'}
      }
    ]
  },

  // {
  //   path: '/menuSalesSlipList',
  //   component: Layout,
  //   redirect: '/menuSalesSlipList/SalesSlipList',
  //   children: [
  //     {
  //       path: 'SalesSlipList',
  //       component: () => import('@/views/menuSalesSlipList/SalesSlipList'),
  //       name: 'SalesSlipList',
  //       meta: { title: '销售单', icon: 'oa_salesSlip'}
  //     }
  //   ]
  // },
  // {
  //   path: '/menuOutGoodsList',
  //   component: Layout,
  //   redirect: '/menuOutGoodsList/OutGoodsList',
  //   children: [
  //     {
  //       path: 'OutGoodsList',
  //       component: () => import('@/views/menuOutGoodsList/OutGoodsList'),
  //       name: 'OutGoodsList',
  //       meta: { title: '出货单', icon: 'oa_outGoods'}
  //     }
  //   ]
  // },
  // { 
  //   path: '/menuPaymentList',
  //   component: Layout,
  //   redirect: '/menuPaymentList/PaymentList',
  //   children: [
  //     {
  //       path: 'PaymentList',
  //       component: () => import('@/views/menuPaymentList/PaymentList'),
  //       name: 'PaymentList',
  //       meta: { title: '付款单', icon: 'oa_ payment',roles: [3,4,5]}
  //     }
  //   ]
  // },
  // {
  //   path: '/menuReceiptList',
  //   component: Layout,
  //   redirect: '/menuReceiptList/ReceiptList',
  //   children: [
  //     {
  //       path: 'ReceiptList',
  //       component: () => import('@/views/menuReceiptList/ReceiptList'),
  //       name: 'ReceiptList',
  //       meta: { title: '收款单', icon: 'oa_refund',roles: [3,4,5]}
  //     }
  //   ]
  // },
  // {
  //   path: '/menuCustomerMana',
  //   component: Layout,
  //   redirect: '/menuCustomerMana/CustomerMana',
  //   children: [
  //     {
  //       path: 'CustomerMana',
  //       component: () => import('@/views/menuCustomerMana/CustomerMana'),
  //       name: 'CustomerMana',
  //       meta: { title: '客户管理', icon: 'oa_customer'}
  //     }
  //   ]
  // },
  // {
  //   path: '/menuSalaryMana',
  //   component: Layout,
  //   redirect: '/menuSalaryMana/SalaryMana',
  //   children: [
  //     {
  //       path: 'SalaryMana',
  //       component: () => import('@/views/menuSalaryMana/SalaryMana'),
  //       name: 'SalaryMana',
  //       meta: { title: '工资单', icon: 'oa_salary'}
  //     }
  //   ]
  // },
  // {
  //   path: '/menuFinancialStatistics',
  //   component: Layout,
  //   redirect: '/menuFinancialStatistics/FinancialStatistics',
  //   children: [
  //     {
  //       path: 'FinancialStatistics',
  //       component: () => import('@/views/menuFinancialStatistics/FinancialStatistics'),
  //       name: 'FinancialStatistics',
  //       meta: { title: '财务统计', icon: 'oa_salary',roles: [1,3,4,5]}
  //     }
  //   ]
  // },
  // {
  //   path: '/menuPeopleMana',
  //   component: Layout,
  //   redirect: '/menuPeopleMana/PeopleMana',
  //   children: [
  //     {
  //       path: 'PeopleMana',
  //       component: () => import('@/views/menuPeopleMana/PeopleMana'),
  //       name: 'PeopleMana',
  //       meta: { title: '用户管理', icon: 'oa-people',roles: [5]}
  //     }
  //   ]
  // },
  // {
  //   path: '/menuDataDictionary',
  //   component: Layout,
  //   redirect: '/menuDataDictionary/PeopleMana',
  //   children: [
  //     {
  //       path: 'PeopleMana',
  //       component: () => import('@/views/menuDataDictionary/DataDictionary'),
  //       name: 'DataDictionary',
  //       meta: { title: '数据字典维护', icon: 'oa-data',roles: [1,2,3,4,5]}
  //     }
  //   ]
  // },
  
  
  // {
  //   path: '/hjPatientMana',
  //   component: Layout,
  //   redirect: '/hjPatientMana/patientList',
  //   alwaysShow: true, // will always show the root menu
  //   meta: {
  //     title: '患者管理',
  //     icon: 'case_control@2x'
  //   },
  //   children: [
  //     {
  //       path: 'patientList',
  //       component: () => import('@/views/hjPatientMana/PatientList'),
  //       name: 'PatientList',
  //       meta: { title: '患者列表', icon: '', affix: true}
  //     },
  //     {
  //       path: 'patientAdd',
  //       component: () => import('@/views/hjPatientMana/PatientList'),
  //       name: 'PatientList',
  //       meta: { title: '新建患者', icon: '',roles: ['管理员','专员']}
  //     },
  //     {
  //       path: 'tysList',
  //       component: () => import('@/views/hjPatientMana/TysList'),
  //       name: 'TysList',
  //       meta: { title: '泰阳伞获取待补充', icon: '',roles: ['管理员','专员']}
  //     },
  //     {
  //       path: 'followTask',
  //       component: () => import('@/views/hjPatientMana/FollowTask'),
  //       name: 'FollowTask',
  //       meta: { title: '随访任务', icon: '',roles: ['管理员','专员']}
  //     },
  //     {
  //       path: 'badEventUP',
  //       component: () => import('@/views/hjPatientMana/BadEventUP'),
  //       name: 'BadEventUP',
  //       meta: { title: '不良事件上报', icon: '',roles: ['管理员','专员']}
  //     },
  //   ]
  // },
 
 
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
