/*
 * @Description: 
 * @Version: 1.0
 * @Autor: jiajun wu
 * @Date: 2020-08-29 11:47:48
 * @LastEditors: jiajun wu
 * @LastEditTime: 2020-08-29 17:16:05
 */
import { loadRoutes, loadGuards } from '@/utils/routerUtil'
import { loadInterceptors } from '@/utils/request'
import guards from '@/router/guards'
import interceptors from '@/utils/axios-interceptors'

/**
 * 启动引导方法
 * 应用启动时需要执行的操作放在这里
 * @param router 应用的路由实例
 * @param store 应用的 vuex.store 实例
 * @param i18n 应用的 vue-i18n 实例
 */
function bootstrap({ router, store, i18n, message }) {
  // 加载 axios 拦截器
  loadInterceptors(interceptors, { router, store, i18n, message })
  // 加载路由
  loadRoutes({ router, store, i18n })
  // 加载路由守卫
  loadGuards(guards, { router, store, i18n, message })

}

export default bootstrap
